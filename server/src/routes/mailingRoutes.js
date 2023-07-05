const { Router } = require("express");
const {
  postSubscriptionHandler,
  getAllSubscribedEmailsHandler,
  getAllSubscribedEmailsWithUsersHandler,
  getAllSubscribedEmailsWithoutUsersHandler,
  patchNewsletterEmailHandler,
  deleteNewsletterEmailHandler,
} = require("../handlers/mailingHandler");

const mailingRoutes = Router();

mailingRoutes.post("/newsletter/subscribe", postSubscriptionHandler);
mailingRoutes.patch("/newsletter/edit", patchNewsletterEmailHandler);
mailingRoutes.delete("/newsletter/unsubscribe", deleteNewsletterEmailHandler);

mailingRoutes.get("/newsletter/all", getAllSubscribedEmailsHandler);
mailingRoutes.get("/newsletter/users", getAllSubscribedEmailsWithUsersHandler);
mailingRoutes.get(
  "/newsletter/nousers",
  getAllSubscribedEmailsWithoutUsersHandler,
);

module.exports = mailingRoutes;
