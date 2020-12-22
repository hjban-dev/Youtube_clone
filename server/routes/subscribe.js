const express = require("express");
const router = express.Router();
const { Subscribe } = require("../models/Subscribe");

// ---------------------------
// 			Subscribe
// ---------------------------

router.post("/subscriberNumber", (req, res) => {
	Subscribe.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
		if (err) return res.status(400).json(err);
		return res.status(200).json({ success: true, subscrberNumber: subscribe.length });
	});
});

router.post("/subscribed", (req, res) => {
	Subscribe.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec((err, subscribe) => {
		if (err) res.status(400).json(err);
		let result = false;

		if (subscribe.length !== 0) {
			result = true;
		}

		res.status(200).json({ success: true, subscribed: result });
	});
});

router.post("/unsubscribe", (req, res) => {
	Subscribe.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec((err, doc) => {
		if (err) res.status(400).json(err);
		res.status(200).json({ success: true, doc });
	});
});

router.post("/subscribe", (req, res) => {
	const subscribe = new Subscribe(req.body);

	subscribe.save((err, doc) => {
		if (err) res.status(400).json(err);
		res.status(200).json({ success: true, doc });
	});
});

module.exports = router;
