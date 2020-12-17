const express = require("express");
const router = express.Router();
const multer = require("multer");

// ---------------------------
// 			VIDEO
// ---------------------------

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: function (req, file, cb) {
		const extenstion = path.extname(file.originalname);

		if (extenstion !== "mp4") {
			return cb(res.status(400).end("mp4 파일이 아닙니다"), false);
		}

		cb(null, true);
	},
});

let upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
	upload(req, res, (err) => {
		if (err) res.json({ success: false, err });

		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
	});
});

module.exports = router;
