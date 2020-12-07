const express = require("express");
const app = express();
const port = 8000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { User } = require("./models/User");

const mongoose = require("mongoose");
const config = require("./config/key");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

// 회원가입 할 때 필요한 정보들을 cilent 에서 가져오면 그것들을 db에 넣는다.
app.post("/register", (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
		});
	});
});

// 요청된 이메일과 비밀번호 확인
app.post("/login", (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: "Auth failed, email not found",
			});

		user.checkPassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: "Wrong password" });

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.cookie("w_authExp", user.tokenExp);
				res.cookie("w_auth", user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
				});
			});
		});
	});
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
