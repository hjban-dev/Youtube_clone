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

module.exports = router;
