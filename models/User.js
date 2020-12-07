const { Mongoose } = require("mongoose");

const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: 1,
	},
	nickname: {
		type: String,
		maxlength: 30,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
});

// User라는 이름을 가진 userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;
