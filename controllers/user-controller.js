const { User } = require("../models");

const userController = {
	// all users
	// /api/users
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: "friends",
				select: "-__v",
			})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
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

	// update user by id
	// /api/users/:id
	updateUserById({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
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
				res.status(500).json(err);
			});
	},

	// delete user by id
	// /api/users/:id
	deleteUserById({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(400).json({ message: "No user found." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// TODO add new friend
	// /api/users/:userId/friends/:friendId
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $push: { friends: params.friendId } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(400).json({ message: "No user found." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// TODO delete friend from friend list
	// /api/users/:userId/friends/:friendId
	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { friends: params.friendId } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(400).json({ message: "No user found." });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};

module.exports = userController;
