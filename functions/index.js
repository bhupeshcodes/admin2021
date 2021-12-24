const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const app = express();
// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require("stripe")(
  "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"
);
const uuid = require("uuid");

app.use(express.static("."));
app.use(express.json());
app.use(cors());

app.post("/payment", async (req, res) => {
  const { product, token } = req.body;
  console.log("Product: ", product);
  console.log("Price: ", product.price);
  const idempotencyKey = uuid.v4();

  // Create a PaymentIntent with the order amount and currency
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "aed",
          customer: customer.id,
          description: product.description,
          receipt_email: product.email,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(8282, () => console.log("Node server listening on port 8282!"));

exports.app = functions.https.onRequest(app);