const router = require("express").Router(),
  Transaction = require("../schemas/transactionSchema"),
  User = require("../schemas/userSchema");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  let transactions = await Transaction.find({ sender: req.user._id });

  let food = [];
  let shopping = [];
  let education = [];
  let others = [];
  let personalPayments = [];
  let rent = [];
  let travel = [];

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category === "food") {
      food.push(transactions[i]);
    } else if (transactions[i].category === "shopping") {
      shopping.push(transactions[i]);
    } else if (transactions[i].category === "education") {
      education.push(transactions[i]);
    } else if (transactions[i].category === "others") {
      others.push(transactions[i]);
    } else if (transactions[i].category === "personalPayments") {
      personalPayments.push(transactions[i]);
    } else if (transactions[i].category === "rent") {
      rent.push(transactions[i]);
    } else if (transactions[i].category === "travel") {
      travel.push(transactions[i]);
    }
  }
  res.render("categories", {
    user: req.user,
    food,
    shopping,
    education,
    others,
    personalPayments,
    rent,
    travel,
  });
});

module.exports = router;
