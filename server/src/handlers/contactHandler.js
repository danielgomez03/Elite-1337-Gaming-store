const { Contact, User, Product } = require("../database");
const { contactValidation } = require("./validations");

const getAllContactsHandler = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error("Error in getAllContactsHandler:", error);
    res.status(500).json({ error: "Failed to retrieve contacts" });
  }
};

const getUserContactHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const contacts = await Contact.findAll({
      where: { userId },
      include: [{ model: User }],
    });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error("Error in getUserContactHandler:", error);
    res.status(500).json({ error: "Failed to retrieve user contacts" });
  }
};

const postContactHandler = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, message, userId } = req.body;

  // Perform validation on form fields
  const errors = contactValidation({
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
  });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    let newContact;

    if (userId) {
      newContact = await Contact.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
        userId,
      });
    } else {
      newContact = await Contact.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      });
    }

    res.status(201).json({ success: true, newContact });
  } catch (error) {
    console.error("Error in postContactHandler:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

module.exports = {
  getAllContactsHandler,
  getUserContactHandler,
  postContactHandler,
};
