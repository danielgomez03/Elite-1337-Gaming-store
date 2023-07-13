const { User, Login, Image } = require("../database");
const {
  getAllUsers,
  getUsersByName,
  getUserById,
} = require("../controllers/usersController");
const { userValidation } = require("./validations");
const {
  sendWelcomeEmailHandler,
  sendEmailUpdateEmailHandler,
  sendPasswordUpdateEmailHandler,
} = require("./mailingHandler");

const getUsers = async (req, res) => {
  const { name } = req.query;

  try {
    let users;

    if (name) {
      users = await getUsersByName(name);
    } else {
      users = await getAllUsers();
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the users" });
  }
};

const getUserByIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user by ID" });
  }
};

const postCreateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      region,
      city,
      address,
      postalCode,
      birthDate,
      phoneNumber,
      idNumber,
      email,
      password,
      image,
    } = req.body;

    // Validate the input data
    const errors = userValidation({
      firstName,
      lastName,
      country,
      region,
      city,
      address,
      postalCode,
      birthDate,
      phoneNumber,
      idNumber,
      email,
      password,
      image,
    });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.create({
      firstName,
      lastName,
      country,
      region,
      city,
      address,
      postalCode,
      birthDate,
      phoneNumber,
      idNumber,
    });

    const login = await Login.create({
      email,
      password,
    });

    await user.setLogin(login);

    let userImage;

    if (req.file) {
      // If an image file was uploaded, create a new image record
      const imageUrl = req.file.path;
      userImage = await Image.create({ url: imageUrl });
    } else if (image) {
      // If an image URL is provided, create a new image record
      userImage = await Image.create({ url: image });
    } else {
      // If neither file nor URL is provided, use the default image URL
      const defaultImageURL =
        "https://res.cloudinary.com/pf-henry-37b-g12/image/upload/v1687509865/users/defaultUserImage.png";
      userImage = await Image.create({ url: defaultImageURL });
    }

    await user.setImage(userImage);

    const createdUser = await User.findByPk(user.userId, {
      attributes: {
        exclude: ["userRole", "isActive", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Login,
          attributes: ["email"],
        },
        {
          model: Image,
          attributes: ["url"],
        },
      ],
    });

    // Send the welcome email
    // UNCOMMENT THIS LINE!!!
    // await sendWelcomeEmailHandler(email, firstName);

    res.status(200).json({ message: "User created successfully", createdUser });
  } catch (error) {
    console.error("Error in postCreateUser:", error);
    res.status(400).json({ message: error.message });
  }
};

const putUpdateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      firstName,
      lastName,
      country,
      region,
      city,
      address,
      postalCode,
      birthDate,
      phoneNumber,
      idNumber,
      image,
    } = req.body;

    // Validate the input data
    const errors = userValidation({
      firstName,
      lastName,
      country,
      region,
      city,
      address,
      postalCode,
      birthDate,
      phoneNumber,
      idNumber,
      image,
    });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Find the user to update
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with the new data
    await user.update({
      firstName,
      lastName,
      country,
      region,
      city,
      address,
      postalCode,
      birthDate,
      phoneNumber,
      idNumber,
    });

    let userImage;

    if (req.file) {
      // If an image file was uploaded, create a new image record
      const imageUrl = req.file.path;
      userImage = await Image.create({ url: imageUrl });
    } else if (image) {
      // If an image URL is provided, create a new image record
      userImage = await Image.create({ url: image });
    } else {
      // If neither file nor URL is provided, use the default image URL
      const defaultImageURL =
        "https://res.cloudinary.com/pf-henry-37b-g12/image/upload/v1687509865/users/default-userImage_yqbaz3.png";
      userImage = await Image.create({ url: defaultImageURL });
    }

    await user.setImage(userImage);

    const updatedUser = await User.findByPk(userId, {
      include: [
        {
          model: Login,
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
        {
          model: Image,
          attributes: {
            exclude: ["caption", "productId", "userId"],
          },
        },
      ],
    });

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error in putUpdateUser:", error);
    res.status(400).json({ message: error.message });
  }
};

const patchUpdateEmail = async (req, res) => {
  try {
    const userId = req.params.userId;

    const { email, newEmail, confirmNewEmail } = req.body;

    // Find the user to update
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const login = await user.getLogin();

    // Validate and update email
    if (newEmail && confirmNewEmail) {
      if (email !== login.email) {
        return res.status(400).json({ message: "Invalid email" });
      }

      if (newEmail !== confirmNewEmail) {
        return res.status(400).json({ message: "Emails do not match" });
      }

      const emailValidationErrors = userValidation({ email: newEmail });
      if (Object.keys(emailValidationErrors).length > 0) {
        return res.status(400).json({
          message: "Email validation failed",
          errors: emailValidationErrors,
        });
      }

      await login.update({ email: newEmail });

      // UNCOMMENT THIS LINE!!!
      // Send email with updated credentials
      // await sendEmailUpdateEmailHandler(login.email, newEmail);
    }

    res.status(200).json({ message: "Email updated successfully", login });
  } catch (error) {
    console.error("Error in patchUpdateEmail:", error);
    res.status(400).json({ message: error.message });
  }
};

const patchUpdatePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Find the user to update
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the login credentials based on the provided changes
    const login = await user.getLogin();

    // Validate and update password if requested
    if (oldPassword && newPassword && confirmNewPassword) {
      if (!(await login.validatePassword(oldPassword))) {
        return res.status(400).json({ message: "Invalid old password" });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const passwordValidationErrors = userValidation({
        password: newPassword,
      });
      if (Object.keys(passwordValidationErrors).length > 0) {
        return res.status(400).json({
          message: "Password validation failed",
          errors: passwordValidationErrors,
        });
      }
      // UNCOMMENT THIS LINE!!!
      // Send password before hashing
      // await sendPasswordUpdateEmailHandler(login.email, newPassword);

      await login.update({ password: newPassword });
    }

    res.status(200).json({ message: "Password updated successfully", login });
  } catch (error) {
    console.error("Error in patchUpdatePassword:", error);
    res.status(400).json({ message: error.message });
  }
};

const patchUpdateUserImage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { image } = req.body;

    // Validate the input data using the existing userValidation
    const errors = userValidation({ image });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Find the user to update
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userImage;

    // Check if an image URL is provided
    if (image) {
      // If an image URL is provided, create a new image record
      userImage = await Image.create({ url: image });
    } else if (req.file) {
      // If an image file was uploaded, create a new image record
      const imageUrl = req.file.path;
      userImage = await Image.create({ url: imageUrl });
    }

    // Update the user's image if a new image record was created
    if (userImage) {
      await user.setImage(userImage);
    }

    // Retrieve the updated user with associated Image model
    const updatedUser = await User.findByPk(userId, {
      include: [
        {
          model: Login,
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
        {
          model: Image,
          attributes: {
            exclude: ["caption", "productId", "userId"],
          },
        },
      ],
    });

    res
      .status(200)
      .json({ message: "User image updated successfully", updatedUser });
  } catch (error) {
    console.error("Error in patchUpdateUserImage:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserByIdHandler,
  postCreateUser,
  putUpdateUser,
  patchUpdateEmail,
  patchUpdatePassword,
  patchUpdateUserImage,
};
