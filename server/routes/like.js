const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
	let variable = {};

	if (req.body.videoId) {
		variable = { videoId: req.body.videoId };
	} else {
		variable = { commentId: req.body.commentId };
	}

	Like.find(variable).exec((err, likes) => {
		if (err) res.status(400).send(err);
		res.status(200).json({ success: true, likes });
	});
});

router.post("/getDislikes", (req, res) => {
	let variable = {};

	if (req.body.videoId) {
		variable = { videoId: req.body.videoId };
	} else {
		variable = { commentId: req.body.commentId };
	}

	Dislike.find(variable).exec((err, dislikes) => {
		if (err) res.status(400).send(err);
		res.status(200).json({ success: true, dislikes });
	});
});

router.post("/uplike", (req, res) => {
	let variable = {};

	if (req.body.videoId) {
		variable = { videoId: req.body.videoId, userId: req.body.userId };
	} else {
		variable = { commentId: req.body.commentId, userId: req.body.userId };
	}

	const like = new Like(variable);

	like.save((err, likeResult) => {
		if (err) res.status(400).send(err);

		Dislike.findOneAndDelete().exec((err, disLikeResult) => {
			if (err) res.status(400).send(err);
			res.status(200).json({ success: true });
		});
	});
});

router.post("/downlike", (req, res) => {
	let variable = {};

	if (req.body.videoId) {
		variable = { videoId: req.body.videoId, userId: req.body.userId };
	} else {
		variable = { commentId: req.body.commentId, userId: req.body.userId };
	}

	Like.findOneAndDelete(variable).exec((err, result) => {
		if (err) res.status(400).send(err);
		res.status(200).json({ success: true });
	});
});

router.post("/updislike", (req, res) => {
	let variable = {};

	if (req.body.videoId) {
		variable = { videoId: req.body.videoId, userId: req.body.userId };
	} else {
		variable = { commentId: req.body.commentId, userId: req.body.userId };
	}

	const dislike = new Dislike(variable);

	dislike.save((err, dislikeResult) => {
		if (err) res.status(400).send(err);

		Like.findOneAndDelete().exec((err, likeResult) => {
			if (err) res.status(400).send(err);
			res.status(200).json({ success: true });
		});
	});
});

router.post("/downDislike", (req, res) => {
	let variable = {};

	if (req.body.videoId) {
		variable = { videoId: req.body.videoId, userId: req.body.userId };
	} else {
		variable = { commentId: req.body.commentId, userId: req.body.userId };
	}

	Dislike.findOneAndDelete(variable).exec((err, result) => {
		if (err) res.status(400).send(err);
		res.status(200).json({ success: true });
	});
});

module.exports = router;
