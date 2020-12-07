const express = require("express");
const app = express();
const port = 8000;

const mongoose = require("mongoose");

mongoose
	.connect("mongodb+srv://hjban:qksvoalffl12@youtube-clone.xp2dt.mongodb.net/<dbname>?retryWrites=true&w=majority", {
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

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
