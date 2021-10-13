const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: "Please enter username.",
			trim: true,
		},
		email: {
			type: String,
			required: "Please enter email.",
			unique: true,
			match: [/.+\@.+\..+/],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

UserSchema.virtual("friendCount").get(function () {
	if (this.friends === undefined) {
		return 0;
	}

	return this.friends.length;
});

UserSchema.pre("remove", function (next) {
	Thought.remove({ _id: this._id }).exec();

	next();
});

const User = model("User", UserSchema);

module.exports = User;
