const { User } = require("../models");

const userController = {
	// TODO get all users
	// /api/users
	getAllUsers(req, res) {
		User.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	//TODO get user by id
	// /api/users/:id

	// TODO post new user
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
