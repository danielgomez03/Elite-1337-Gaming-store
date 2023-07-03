const nodemailer = require("nodemailer");
const { Newsletter, User } = require("../database");
const { Op } = require("sequelize");

const postSubscription = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userId = req.user ? req.user.userId : null;

    // Check if the email already exists in the database
    const existingNewsletter = await Newsletter.findOne({
      where: { newsletterEmail: email },
    });

    if (existingNewsletter) {
      // If the user is logged in and the existing email is associated with their user ID,
      // allow the subscription. Otherwise, return an error.
      if (userId && existingNewsletter.userId === userId) {
        return res
          .status(400)
          .json({ error: "Email already subscribed by the user" });
      }

      // If the user is not logged in and the email already exists,
      // return an error indicating that the email is already subscribed.
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Check if the user is logged in and already has an associated email
    if (userId) {
      const userNewsletter = await Newsletter.findOne({
        where: { userId },
      });

      // If the user is logged in and already has an associated email,
      // return an error indicating that the user already has a subscribed email.
      if (userNewsletter) {
        return res
          .status(400)
          .json({ error: "User already has a subscribed email" });
      }
    }

    // Create a new newsletter entry with the userId from the session
    await Newsletter.create({ newsletterEmail: email, userId });

    // Send the welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "1337hardwaregaming@gmail.com",
        pass: "gqarbnecmbxwgtcq",
      },
    });

    const mailOptions = {
      from: "1337 HARDWARE <newsletter@1337hardware.com>",
      to: email,
      subject: "Welcome to our newsletter",
      text: "Thank you for subscribing!",
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    next(error);
  }
};

const patchNewsletterEmail = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the newsletter entry associated with the user
    const newsletter = await Newsletter.findOne({
      where: { userId },
    });

    if (!newsletter) {
      return res
        .status(404)
        .json({ error: "User does not have a subscribed email" });
    }

    // Update the newsletter email
    newsletter.newsletterEmail = email;
    await newsletter.save();

    res.status(200).json({ message: "Newsletter email updated successfully" });
  } catch (error) {
    console.error("Error updating newsletter email:", error);
    next(error);
  }
};

const getAllSubscribedEmails = async (req, res, next) => {
  try {
    const subscribedEmails = await Newsletter.findAll({
      attributes: ["userId", "newsletterEmail"],
    });

    res.status(200).json(subscribedEmails);
  } catch (error) {
    console.error("Error getting subscribed emails:", error);
    next(error);
  }
};

const getAllSubscribedEmailsWithUsers = async (req, res, next) => {
  try {
    const subscribedEmails = await Newsletter.findAll({
      attributes: ["newsletterEmail"],
      include: [
        {
          model: User,
          attributes: ["userId", "firstName", "lastName"],
          where: { userId: { [Op.ne]: null } },
        },
      ],
    });

    res.status(200).json(subscribedEmails);
  } catch (error) {
    console.error("Error getting subscribed emails with users:", error);
    next(error);
  }
};

const getAllSubscribedEmailsWithoutUsers = async (req, res, next) => {
  try {
    const subscribedEmails = await Newsletter.findAll({
      attributes: ["newsletterEmail"],
      where: { userId: null },
    });

    res.status(200).json(subscribedEmails);
  } catch (error) {
    console.error("Error getting subscribed emails without users:", error);
    next(error);
  }
};

module.exports = {
  postSubscription,
  getAllSubscribedEmails,
  getAllSubscribedEmailsWithUsers,
  getAllSubscribedEmailsWithoutUsers,
  patchNewsletterEmail,
};
