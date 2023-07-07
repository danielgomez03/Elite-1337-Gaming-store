const { User, Login } = require("../database");
const { sendUserDisabledEmailHandler } = require("../handlers/mailingHandler");

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
    // UNCOMMENT THIS LINE!!!
    // await sendUserDisabledEmailHandler(email, firstName);

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

module.exports = {
  getDisabledUsersHandler,
  patchDisableUserHandler,
  patchEnableUserHandler,
};
