const { Router } = require("express");
const { processPaymentHandler } = require("../handlers/stripeHandler")

const stripeRoutes = Router();

stripeRoutes.post("/process-payment", processPaymentHandler)

module.exports = stripeRoutes;