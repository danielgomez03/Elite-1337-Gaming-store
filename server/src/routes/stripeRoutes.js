const { Router } = require("express");
const { processPaymentHandler, getAllPaymentsHandler } = require("../handlers/stripeHandler")

const stripeRoutes = Router();

stripeRoutes.post("/process-payment", processPaymentHandler)
stripeRoutes.get("/process", getAllPaymentsHandler)

module.exports = stripeRoutes;