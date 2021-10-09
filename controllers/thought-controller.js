const { Thought, User } = require("../models");
const { db } = require("../models/User");

const thoughtController = {
	//  get all thoughts
	// /api/thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// get thought by ID
	// /api/thoughts/:id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(400).json({ message: "No thought found" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// create new thought
	// /api/thoughts
	createThought({ body }, res) {
		Thought.create(body)
			.then((dbThoughtData) => {
				User.findOneAndUpdate(
					{ username: dbThoughtData.username },
					{ $push: { thoughts: dbThoughtData._id } },
					{ new: true, runValidators: true }
				).then((data) => {
					if (!data) {
						res.status(400).json({ message: "Unable to create thought." });
						return;
					}
					Thought.findOne(data.thoughts[data.thoughts.length - 1]).then(
						(reply) => res.json(reply)
					);
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// TODO update thought by ID
	// /api/thoughts/:id
	updateThoughtById({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(400).json({ message: "No thought found." });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// delete thought by ID
	// /api/thoughts/:id
	deleteThoughtById({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(400).json({ message: "No thought found." });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};

module.exports = thoughtController;
