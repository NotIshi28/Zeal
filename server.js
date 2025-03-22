require("dotenv").config();

const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  session = require("express-session"),
  flash = require("express-flash"),
  app = express(),
  passportInit = require("./utils/passport-config"),
  {
    ensureAuthenticated,
    forwardAuthenticated,
  } = require("./utils/authenticate"),
  PORT = process.env.PORT || 3000;

const indexRouter = require("./routers/indexRouter"),
  loginRouter = require("./routers/loginRouter"),
  scanRouter = require("./routers/scanRouter"),
  profileRouter = require("./routers/profileRouter"),
  familyRouter = require("./routers/familyRouter"),
  emergencyRouter = require("./routers/emergencyRouter"),
  qrCodeRouter = require("./routers/qrCodeRouter"),
  regRouter = require("./routers/regRouter");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
passportInit(passport);
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, console.log("MONGODB CONNECTED"));

app.use("/", indexRouter);
app.use("/scan", ensureAuthenticated, scanRouter);
app.use("/login", forwardAuthenticated, loginRouter);
app.use("/profile", ensureAuthenticated, profileRouter);
app.use("/emergency", ensureAuthenticated, emergencyRouter);
app.use("/family", ensureAuthenticated, familyRouter);
app.use("/qrcode", ensureAuthenticated, qrCodeRouter);
app.use("/register", forwardAuthenticated, regRouter);
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
    return res.redirect("/login");
  });
});
app.get("/wheel", ensureAuthenticated, (req, res) => {
  res.render("wheel");
});
app.get("/calendar", ensureAuthenticated, (req, res) => {
  res.render("calendar");
});
app.get("/crypto", ensureAuthenticated, (req, res) => {
  res.render("crypto");
});
app.get("/rewards", ensureAuthenticated, (req, res) => {
  res.render("rewards");
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
