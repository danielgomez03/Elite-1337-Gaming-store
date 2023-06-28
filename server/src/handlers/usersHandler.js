const { conn, User, Login, Image } = require("../database");
const {
  getAllUsers,
  getUsersByName,
  getUserById,
} = require("../controllers/usersController");
const {
  userValidation,
} = require("../../../client/src/components/validations");

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

    // Check if an image URL is provided
    if (image) {
      // If an image URL is provided, create a new image record
      userImage = await Image.create({ url: image });
    } else if (req.file) {
      // If an image file was uploaded, upload the file and create a new image record
      userImage = await Image.uploadUser(req.file);
    } else {
      // If neither file nor URL is provided, use the default image URL
      const defaultImageURL =
        "https://res.cloudinary.com/pf-henry-37b-g12/image/upload/v1687509865/users/default-userImage_yqbaz3.png";
      userImage = await Image.create({ url: defaultImageURL });
    }

    await user.setImage(userImage);

    const createdUser = await User.findByPk(user.userId, {
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

    // Update the login credentials
    const login = await user.getLogin();
    await login.update({ email, password });

    let userImage;

    // Check if an image URL is provided
    if (image) {
      // If an image URL is provided, create a new image record
      userImage = await Image.create({ url: image });
    } else if (req.file) {
      // If an image file was uploaded, upload the file and create a new image record
      userImage = await Image.uploadUser(req.file);
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

    res
      .status(200)
      .json({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Error in putUpdateUserProfile:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserByIdHandler,
  postCreateUser,
  putUpdateUser,
};
