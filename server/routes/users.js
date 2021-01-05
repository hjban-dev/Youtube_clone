const express = require("express");
const router = express.Router();

const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

// ---------------------------
// 			USER
// ---------------------------

// 회원가입 할 때 필요한 정보들을 cilent 에서 가져오면 그것들을 db에 넣는다.
router.post("/register", (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		// console.log(err);
		if (err) return res.status(400).send(err);
		return res.status(200).json({
			success: true,
		});
	});
});

// 요청된 이메일과 비밀번호 확인
router.post("/login", (req, res) => {
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

router.get("/auth", auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		role: req.user.role,
		image: req.user.image,
	});
});

router.get("/logout", auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({
			success: true,
		});
	});
});

module.exports = router;
