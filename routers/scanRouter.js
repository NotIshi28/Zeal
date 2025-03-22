const router = require("express").Router(),
  User = require("../schemas/userSchema"),
  Transcaton = require("../schemas/transactionSchema"),
  bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  if (!req.user) return res.redirect("/login");
  res.render("scan");
});

router.post("/verifyId", async (req, res) => {
  console.log(req.body);
  if (!req.user) return res.redirect("/login");
  try {
    const user = await User.findById(req.body.id);
    if (user) return res.json({ success: true, id: user._id });
  } catch (error) {
    return res.json({ success: false });
  }

  return res.json({ success: false });
});

router.get("/:id", async (req, res) => {
  const users = await User.find({});
  let payee;
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id == req.params.id) {
      payee = users[i];
      break;
    }
  }

  res.render("pay", {
    user: req.user,
    payee: payee,
    error: "",
  });
});

router.post("/pay/:id", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const { amount, password, category } = req.body;
  console.log(category);
  const payee = await User.findById(req.params.id);
  console.log(payee);

  bcrypt.compare(password, req.user.password).then((match) => {
    if (!match) {
      return res.render("pay", {
        user: req.user,
        payee: payee,
        error: "Incorrect password.",
      });
    }
  });
  if (!password) {
    return res.render("pay", {
      user: req.user,
      payee: payee,
      error: "Please enter your password.",
    });
  }
  if (!amount) {
    return res.render("pay", {
      user: req.user,
      payee: payee,
      error: "Please enter an amount.",
    });
  }
  if (req.user.balance < amount) {
    return res.render("pay", {
      user: req.user,
      payee: payee,
      error: "Insufficient balance.",
    });
  }
  const newTransaction = new Transcaton({
    sender: req.user._id,
    receiver: payee._id,
    receiverName: payee.fname + " " + payee.lname,
    amount: amount,
    category: category,
  });
  await newTransaction.save();
  if (payee) {
    req.user.balance -= amount;
    payee.balance += parseInt(amount);
    await req.user.save();
    await payee.save();
    return res.redirect("/");
  }
});

module.exports = router;
