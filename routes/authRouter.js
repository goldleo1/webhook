const router = require("express").Router();
const path = require("path");

const db = {
  auth: {
    id: {
      pw: "pw",
    },
    jinwan: {
      pw: "jinwan",
    },
  },
};

const templateDir = path.join(__dirname, "..", "template");

router.get("/login", (req, res) => {
  res.sendFile(path.join(templateDir, "login.html"));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.redirect(401, "/auth/login");
  }
  if (username == "__proto__" || password == "__proto__") {
    return res.redirect(500, "/auth/login");
  }
  const user = db.auth[username];
  if (!user) {
    return res.redirect(401, "/auth/login");
  }
  if (user.pw != password) {
    return res.redirect(401, "/auth/login");
  }
  req.session.req.session.isLogined = true;
  req.session.username = username;
  req.session.save(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
