const { Router } = require("express");
const {
  postSubscription,
  getAllSubscribedEmails,
  getAllSubscribedEmailsWithUsers,
  getAllSubscribedEmailsWithoutUsers,
  patchNewsletterEmail,
} = require("../handlers/newsletterHandler");

const newsletterRoutes = Router();

newsletterRoutes.post("/subscribe", postSubscription);
newsletterRoutes.patch("/edit", patchNewsletterEmail);

newsletterRoutes.get("/all", getAllSubscribedEmails);
newsletterRoutes.get("/users", getAllSubscribedEmailsWithUsers);
newsletterRoutes.get("/nousers", getAllSubscribedEmailsWithoutUsers);

module.exports = newsletterRoutes;
