// index.js

const express = require("express");
const path = require("path");
const app = express();

let db = {};

const webhookRouter = require("./routes/webhookRouter.js")(db);
const hookRouter = require("./routes/hookRouter.js")(db);

const PORT = 80;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use("/redirect", redirectRouter);
// app.use("/r", redirectRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "index.html"));
});

app.use("/webhook", webhookRouter);
app.use("/h", hookRouter);

// app.get("/favicon.ico", (req, res) => res.send(""));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
