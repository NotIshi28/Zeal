const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req.user) return res.redirect("/login");
  res.render("qrcode", { user: req.user });
});

module.exports = router;
