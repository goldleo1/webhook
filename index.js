// index.js

const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const fileStore = require("session-file-store")(session);

// let db = {};

// const webhookRouter = require("./routes/webhookRouter.js")(db);
// const hookRouter = require("./routes/hookRouter.js")(db);
// const authRouter = require("./routes/authRouter.js");
const redirectRouter = require("./routes/redirectRouter.js");

// const authMiddleware = require("./middleware/authMiddleware.js");

const PORT = 80;

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1h
    },
    store: new fileStore(),
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use(authMiddleware);

app.use("/redirect", redirectRouter);
app.use("/r", redirectRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "index.html"));
});

// app.use("/webhook", webhookRouter);
// app.use("/hook", hookRouter);
// app.use("/h", hookRouter);

// app.get("/favicon.ico", (req, res) => res.send(""));

// app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
