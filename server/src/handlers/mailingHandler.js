const nodemailer = require("nodemailer");
const { Newsletter, User, Product } = require("../database");
const { Op } = require("sequelize");

// Create the transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "1337hardwaregaming@gmail.com",
    pass: "gqarbnecmbxwgtcq",
  },
});

// Update with the correct URL
const homeLink = "https://ft37b-pf-grupo12.vercel.app/";
const loginLink = "https://ft37b-pf-grupo12.vercel.app/login";

const sendEmailUpdateEmailHandler = async (email, newEmail) => {
  const mailOptions = {
    from: "1337 HARDWARE <newsletter@1337hardware.com>",
    to: email,
    subject: "Your credentials have been updated",
    html: `
      <h1>Your login information has changed</h1>
      <p style="text-align: center;">
        Your credentials for accessing the <span style="font-weight: bold;">1337 HARDWARE</span> platform have been successfully updated.
      </p>
      <p style="text-align: center;">
      <span style="font-weight: bold;">New Email:</span>
      <p style="text-align: center;">
     ${newEmail}
      </p>
      </p>
      <p style="text-align: center;">
        If you did not request these changes or believe this is an error, please contact our support team immediately.
      </p>
      <p style="text-align: right;">
          <span style="font-weight: bold;">Best regards,</span><br>
          The <span style="font-weight: bold;">1337 HARDWARE Team</span>
        </p>
      <p style="text-align: center;">
        <a href="${homeLink}" style="display: inline-block;">
          <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
        </a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordUpdateEmailHandler = async (email, newPassword) => {
  const mailOptions = {
    from: "1337 HARDWARE <newsletter@1337hardware.com>",
    to: email,
    subject: "Your credentials have been updated",
    html: `
      <h1>Your login information has changed</h1>
      <p style="text-align: center;">
        Your credentials for accessing the <span style="font-weight: bold;">1337 HARDWARE</span> platform have been successfully updated.
      </p>
      <p style="text-align: center;">
      <span style="font-weight: bold;">New Password:</span>
      <p style="text-align: center;">
     ${newPassword}
      </p>
      </p>
      <p style="text-align: center;">
        If you did not request these changes or believe this is an error, please contact our support team immediately.
      </p>
      <p style="text-align: right;">
          <span style="font-weight: bold;">Best regards,</span><br>
          The <span style="font-weight: bold;">1337 HARDWARE Team</span>
        </p>
      <p style="text-align: center;">
        <a href="${homeLink}" style="display: inline-block;">
          <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
        </a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendWelcomeEmailHandler = async (email, firstName) => {
  const mailOptions = {
    from: "1337 HARDWARE <newsletter@1337hardware.com>",
    to: email,
    subject: "Welcome to our platform",
    html: `
      <h1>Welcome to our platform!</h1>
      <p>
        Dear ${firstName},
      </p>
      <p>
        We are thrilled to welcome you to the <span style="font-weight: bold;">1337 HARDWARE</span> community! Thank you for joining us. As a valued member, you now have access to all the exciting features and benefits our platform offers.
      </p>
      <p>
        At <span style="font-weight: bold;">1337 HARDWARE</span>, we are passionate about gaming and dedicated to providing you with top-notch components and gaming hardware. Whether you're building a powerful gaming rig or upgrading your existing setup, we've got you covered.
      </p>
      <p>
        Our mission is to enhance your gaming experience by offering a wide range of high-quality products, including graphics cards, processors, motherboards, RAM, storage devices, and more. With our expert team and cutting-edge technology, we strive to provide you with the best gaming gear available.
      </p>
      <p>
        If you have any questions or need assistance, feel free to reach out to our support team. We are here to help and ensure that your gaming journey with us is exceptional.
      </p>
      <p>
        To get started, simply click the button below to log in to your account and explore the platform:
      </p>
      <p style="text-align: center;">
        <a href="${loginLink}" style="display: inline-block; padding: 10px 20px; background-color: indigo; color: white; text-decoration: none; font-weight: bold;">Log In</a>
      </p>
      <p>
        Once again, welcome to the <span style="font-weight: bold;">1337 HARDWARE</span> family. We are thrilled to have you on board and can't wait to share our gaming expertise and exciting updates with you!
      </p>
      <p style="text-align: right;">
          <span style="font-weight: bold;">Best regards,</span><br>
          The <span style="font-weight: bold;">1337 HARDWARE Team</span>
        </p>
        <p style="text-align: center;">
        <a href="${homeLink}" style="display: inline-block;">
          <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
        </a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendUserDisabledEmailHandler = async (email, firstName) => {
  const mailOptions = {
    from: "1337 HARDWARE <newsletter@1337hardware.com>",
    to: email,
    subject: "Your account has been disabled",
    html: `
      <h1>Your account has been disabled</h1>
      <p>
        Dear ${firstName},
      </p>
      <p>
        We regret to inform you that your account on the <span style="font-weight: bold;">1337 HARDWARE</span> platform has been disabled by the administrator. As a result, you will no longer be able to access your account or use our services.
      </p>
      <p>
        If you believe this is an error or have any concerns, please contact our support team for further assistance.
      </p>
      <p style="text-align: right;">
        <span style="font-weight: bold;">Best regards,</span><br>
        The <span style="font-weight: bold;">1337 HARDWARE Team</span>
      </p>
      <p style="text-align: center;">
        <a href="${homeLink}" style="display: inline-block;">
          <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
        </a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const postSubscriptionHandler = async (req, res, next) => {
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

    const mailOptions = {
      from: "1337 HARDWARE <newsletter@1337hardware.com>",
      to: email,
      subject: "Thank you for subscribing to our newsletter",
      html: `
        <h1>Welcome to 1337 HARDWARE Newsletter!</h1>
        <p>
          Thank you for subscribing to our newsletter. We are excited to have you on board! As a subscriber, you'll be the first to receive the latest news, special offers, and exclusive deals on PC parts and gaming hardware.
        </p>
        <p>
          At <span style="font-weight: bold;">1337 HARDWARE</span>, we're passionate about gaming and dedicated to providing top-notch components for gamers like you. Whether you're building a powerful gaming rig or upgrading your existing setup, we've got you covered.
        </p>
        <p>
          As an online-only store, we offer a wide range of high-quality products, including graphics cards, processors, motherboards, RAM, storage devices, and more. Our team of experts is always ready to assist you in finding the perfect hardware to enhance your gaming experience.
        </p>
        <p>
          Stay tuned for our newsletters, as they will keep you informed about the latest product launches, special promotions, and upcoming events. Don't miss out on the chance to grab amazing deals and stay ahead in the gaming world!
        </p>
        <p>
          Once again, welcome to the <span style="font-weight: bold;">1337 HARDWARE</span> Newsletter family. We can't wait to share our gaming expertise and exciting updates with you!
        </p>
        <p style="text-align: right;">
          <span style="font-weight: bold;">Best regards,</span><br>
          The <span style="font-weight: bold;">1337 HARDWARE Team</span>
        </p>
        <p style="text-align: center;">
        <a href="${homeLink}" style="display: inline-block;">
          <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
        </a>
      </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    next(error);
  }
};

const sendOrderConfirmationEmailHandler = async (
  email,
  orderId,
  latestOrder,
  payment,
) => {
  const {
    orderTotalPrice,
    payerFirstName,
    payerLastName,
    payerPhone,
    payerAddress,
    orderProducts,
  } = latestOrder;

  const getProductDetails = async (productId) => {
    const product = await Product.findByPk(productId);
    return product
      ? {
          name: product.name,
          price: product.price,
          discount: product.discount,
        }
      : { name: "Product Not Found", price: 0, discount: 0 };
  };

  const productsTableRows = await Promise.all(
    orderProducts.map(async (product) => {
      const productDetails = await getProductDetails(product.productId);
      const productName = productDetails.name;
      const productPrice = productDetails.price;
      const productDiscount = productDetails.discount;
      const discountedPrice = (
        productPrice -
        (productPrice * productDiscount) / 100
      ).toFixed(2);
      return `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${productName}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${product.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">$${discountedPrice}</td>
        </tr>
      `;
    }),
  );

  const mailOptions = {
    from: "1337 HARDWARE <newsletter@1337hardware.com>",
    to: email,
    subject: "Order Confirmation",
    html: `
      <h1>Thank you for your order!</h1>
      <p>
        Dear <span style="font-weight: bold;">${payerFirstName} ${payerLastName}</span>,
      </p>
      <p>
        Thank you for placing an order with <span style="font-weight: bold;">1337 HARDWARE</span>! We're excited to fulfill your order and provide you with top-notch products and services.
      </p>
      <p>
        <span style="font-weight: bold;">Order details:</span>
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Order ID</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Date</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Total Price</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${orderId}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${new Date().toLocaleString()}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">$${orderTotalPrice}</td>
        </tr>
      </table>
      <p>
        <span style="font-weight: bold;">Shipping details:</span>
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Name</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Address</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Contact</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${payerFirstName} ${payerLastName}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${payerAddress}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${payerPhone}</td>
        </tr>
      </table>
      <p>
        <span style="font-weight: bold;">Order Items:</span>
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Product</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Price</th>
        </tr>
        ${productsTableRows.join("")}
      </table>
      <p>
      <span style="font-weight: bold;">Payment details:</span>
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Payment Method</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Amount</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center; font-weight: bold;">Transaction ID</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            payment.method
          }</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">$${
            payment.amount
          }</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
            payment.transactionData
          }</td>
        </tr>
      </table>
      <p>
        If you have any questions or need further assistance regarding your order, please feel free to contact our customer support team.
      </p>
      <p style="text-align: right;">
        <span style="font-weight: bold;">Best regards,</span><br>
        The <span style="font-weight: bold;">1337 HARDWARE Team</span>
      </p>
      <p style="text-align: center;">
        <a href="${homeLink}" style="display: inline-block;">
          <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
        </a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmailHandler = async (email, firstName, newPassword) => {
  const mailOptions = {
    from: "1337 HARDWARE <newsletter@1337hardware.com>",
    to: email,
    subject: "Password Reset",
    html: `
    <h1>Request for Password Reset</h1>
    <p>Dear <strong>${firstName}</strong>,</p>
    <div style="text-align: center;">
      <p>We have received a request to reset your password for your account at <span style="font-weight: bold;">1337 HARDWARE</span>.</p>
      <p>Your new password is: <strong>${newPassword}</strong></p>
      <p>Please login to your account using this new password and remember to change it once you log in.</p>
      <p>
        <a href="${loginLink}" style="display: inline-block; padding: 10px 20px; background-color: indigo; color: white; text-decoration: none; font-weight: bold;">Log In</a>
      </p>
      <p>If you did not request a password reset, please contact our support team immediately.</p>
    </div>
    <p style="text-align: right;">
      <span style="font-weight: bold;">Best regards,</span><br>
      The <span style="font-weight: bold;">1337 HARDWARE Team</span>
    </p>
    <p style="text-align: center;">
      <a href="${homeLink}" style="display: inline-block;">
        <img src="https://content.ibuypower.com//Images/en-US/Lobby/TvWall/katapult-TVWall-Mobile.jpg" alt="Welcome Image" style="display: block; margin: 0 auto;">
      </a>
    </p>
  `,
  };

  await transporter.sendMail(mailOptions);
};

const patchNewsletterEmailHandler = async (req, res, next) => {
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

const deleteNewsletterEmailHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userId = req.user ? req.user.userId : null;

    // Check if the email exists in the database
    const existingNewsletter = await Newsletter.findOne({
      where: { newsletterEmail: email },
    });

    if (!existingNewsletter) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Delete the newsletter entry
    await existingNewsletter.destroy();

    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    next(error);
  }
};

const getAllSubscribedEmailsHandler = async (req, res, next) => {
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

const getAllSubscribedEmailsWithUsersHandler = async (req, res, next) => {
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

const getAllSubscribedEmailsWithoutUsersHandler = async (req, res, next) => {
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
  postSubscriptionHandler,
  getAllSubscribedEmailsHandler,
  getAllSubscribedEmailsWithUsersHandler,
  getAllSubscribedEmailsWithoutUsersHandler,
  patchNewsletterEmailHandler,
  deleteNewsletterEmailHandler,
  sendWelcomeEmailHandler,
  sendEmailUpdateEmailHandler,
  sendPasswordUpdateEmailHandler,
  sendUserDisabledEmailHandler,
  sendOrderConfirmationEmailHandler,
  sendPasswordResetEmailHandler,
};
