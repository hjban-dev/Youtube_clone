const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { User } = require("./server/models/User");
const { auth } = require("./server/middleware/auth");

const mongoose = require("mongoose");
const config = require("./server/config/key");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
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

app.get("/api/hello", (req, res) => {
	res.send("Hello World!222");
});

// 회원가입 할 때 필요한 정보들을 cilent 에서 가져오면 그것들을 db에 넣는다.
app.post("/api/users/register", (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
		});
	});
});

// 요청된 이메일과 비밀번호 확인
app.post("/api/users/login", (req, res) => {
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

app.get("/api/users/auth", auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
	});
});

app.get("/api/users/logout", auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({
			success: true,
		});
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
