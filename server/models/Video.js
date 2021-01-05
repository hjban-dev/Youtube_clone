const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			maxlength: 250,
		},
		description: {
			type: String,
		},
		privacy: {
			type: Number,
		},
		filePath: {
			type: String,
		},
		views: {
			type: Number,
			default: 1,
		},
		duration: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = { Video };
