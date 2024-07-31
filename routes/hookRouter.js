const router = require("express").Router();
const path = require("path");
const crypto = require("crypto");

const config = require("../config");

let idList = [];

function dbTimeout(db) {
  const now = new Date().getTime();
  for (const key in db) {
    if (now - db[key].id > config.dbClearTime) {
      delete db[key];
      console.log(1);
    } else break;
  }
}

module.exports = function (db, customHook) {
  setInterval(() => {
    dbTimeout(db);
  }, config.autoDBtimeout);
  router.use((req, res) => {
    dbTimeout(db);
    const time = new Date();
    idList.push(time.getTime());
    db[ // base64 : len -> 4/3 * len
      crypto
        .randomBytes(32)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "")
        .slice(0, 32)
    ] = {
      id: time.getTime(),
      time: time,
      ip: req.ip,
      method: req.method,
      path: req.path,
      query: new URLSearchParams(req.query).toString(),
      headers: req.headers,
      body: req.body,
    };
    res.send(req.ip);
  });

  return router;
};
