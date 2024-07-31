const router = require("express").Router();

router.use((req, res) => {
  const { url } = req.query;
  console.log(url);
  try {
    if (!url.startsWith("http")) {
      port = Number(url.split(":")[1]);
      res.redirect(
        `http://localhost${port ? ":" + port : ""}/${
          port ? url.split(":")[0] : url
        }`
      );
    } else {
      res.redirect(url);
    }
  } catch (error) {
    res.redirect("https://www.example.com");
  }
});

module.exports = router;
