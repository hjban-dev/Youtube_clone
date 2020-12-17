const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./server/config/key");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.use("/api/users", require("./server/routes/users"));
app.use("/api/video", require("./server/routes/video"));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
