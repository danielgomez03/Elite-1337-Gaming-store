const { User, Login, Product } = require("../database");
const { sendUserDisabledEmailHandler } = require("../handlers/mailingHandler");
const { editProduct } = require("../controllers/adminControllers");

const getDisabledUsersHandler = async (req, res) => {
  try {
    const disabledUsers = await User.findAll({ where: { isActive: false } });
    res.json(disabledUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve disabled users" });
  }
};

const patchDisableUserHandler = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByPk(userId, { include: Login });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isActive) {
      return res.status(400).json({ error: "User is already disabled" });
    }

    user.isActive = false;
    await user.save();

    const login = await Login.findOne({ where: { userId } });
    const email = login.email;
    const firstName = user.firstName;

    // Send disabled user mail
    await sendUserDisabledEmailHandler(email, firstName);

    res.json({ message: "User disabled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to disable user" });
  }
};

const patchEnableUserHandler = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isActive) {
      return res.status(400).json({ error: "User is already enabled" });
    }

    user.isActive = true;
    await user.save();

    res.json({ message: "User enabled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to enable user" });
  }
};

const patchProductStatusHandler = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isActive = !product.isActive;
    await product.save();

    const message = product.isActive ? "Product enabled" : "Product disabled";
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product status" });
  }
};

const patchProductHandler = async (req, res) => {
  const { productId, updates } = req.body;
  try {
    const product = await editProduct(productId, updates);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error in patchProductHandler:", error);
    res.status(500).json({ error: "Failed to edit the product" });
  }
};

module.exports = {
  getDisabledUsersHandler,
  patchDisableUserHandler,
  patchEnableUserHandler,
  patchProductHandler,
  patchProductStatusHandler,
};
