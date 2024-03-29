const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: "Please enter reaction.",
			maxLength: [280],
		},
		username: {
			type: String,
			required: "Please enter username.",
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: "Please enter thought.",
			minLength: [1],
			maxLength: [280],
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		username: {
			type: String,
			required: "Please enter username",
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

ThoughtSchema.virtual("reactionCount").get(function () {
	if (this.reactions === undefined) {
		return 0;
	}

	return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
