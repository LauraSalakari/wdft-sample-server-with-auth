const express = require('express');
const router  = express.Router();

const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51Hj18JFNasNlOLrVz6v9mTHDGZZdK7jMgb2ulQJUjDvm9iMoaA7tVmGgPr4uROS4LEpDR6shyyZ5d97OeVun1Qdw00uWYeMBa9");

router.use(express.static("."));
router.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

module.exports = router;