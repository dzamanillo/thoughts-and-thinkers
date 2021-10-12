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

	// update thought by ID
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

	//  add reaction to comment
	// /api/thoughts/:thoughtId/reactions
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbReactionData) => {
				console.log("dbReactionData: ", dbReactionData);
				if (!dbReactionData) {
					res.status(400).json({ message: "Comment not found." });
					return;
				}
				res.json(dbReactionData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// delete reaction
	// /api/thoughts/:thoughtId/reactions/:reactionId
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true, runValidators: true }
		)
			.then((dbReactionData) => {
				if (!dbReactionData) {
					res.status(400).json({ message: "Comment not found." });
					return;
				}
				res.json({ msg: "delete success", data: dbReactionData });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};

module.exports = thoughtController;
