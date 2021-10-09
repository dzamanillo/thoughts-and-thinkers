const { User } = require("../models");

const userController = {
	// all users
	// /api/users
	getAllUsers(req, res) {
		User.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// get user by id
	// /api/users/:id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.populate({
				path: "friends",
				select: "-__v",
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(400).json({ message: "No user found." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// post new user
	// /api/users
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};

module.exports = userController;
