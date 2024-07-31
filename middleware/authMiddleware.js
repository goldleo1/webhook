const { allowedPath } = require("../config");

function pathToRegex(path) {
  const regexString = path.replace("*", ".*");
  return new RegExp(`^${regexString}$`);
}

module.exports = (req, res, next) => {
  const matched = allowedPath.some((path) => pathToRegex(path).test(req.path));

  if (req.session.isLogined || matched) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
};
