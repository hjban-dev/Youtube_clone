const express = require("express");
const app = express();
const port = 8000;

// const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB connected.."))
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/register", (req, res) => {
	// 회원가입 할 때 필요한 정보들을 cilent 에서 가져오면 그것들을 db에 넣는다.

	const user = new User(req.body);

	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });

		return res.status(200).json({
			success: true,
		});
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
