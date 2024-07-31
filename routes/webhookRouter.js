const router = require("express").Router();
const path = require("path");

const timeUtil = require("../lib/time");

const templateDir = path.join(__dirname, "..", "template");

module.exports = function (db) {
  router.get("/view", (req, res) => {
    res.sendFile(path.join(templateDir, "webhook.html"));
  });

  router.get("/list", (req, res) => {
    const list = [];
    Object.keys(db).forEach((key) => {
      const { id, time, method, path } = db[key];
      const hms = timeUtil.time2hms(time);
      const day = timeUtil.time2day(time);
      list.push([id, key, `${day} ${hms}`, `${method} ${path}`]);
    });
    res.json(list.sort((a, b) => b[0] - a[0]));
  });

  router.get("/get/:key", (req, res) => {
    const { key } = req.params;
    res.json(key in db ? db[key] : undefined);
  });

  router.get("/delete/:id", (req, res) => {
    const { id } = req.params;
    if (id in db) {
      delete db[id];
      res.json("success");
    } else {
      res.json("fail");
    }
  });

  return router;
};
