const { conn, User, Login, Image } = require('../database');
const { getAllUsers, getUsersByName, getUserById } = require('../controllers/usersController');

const getUsers = async (req, res) => {
  const { name } = req.query;

  try {
    let users;

    if (name) {
      users = await getUsersByName(name);
    } else {
      users = await getAllUsers()
    }

    res.status(200).json(users);

  } catch (error) {
      console.error('Error in getUsers:', error);
      res.status(500).json({ message: 'An error occurred while retrieving the users' });
  }
};

const getUserByIdHandler = async (req, res) => {
  
  const { userId } = req.params;
  
  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the user by ID' });
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

    // Create and associate the image with the user
    if (image) {
      const { url } = image;
      const userImage = await Image.create({ url });
      await user.setUserImage(userImage);
    }

    // // Create and associate the image with the user with text URL
    // for (const imageData of image) {
    //   const { url } = imageData;
    //   const image = await Image.create({
    //     url
    //   });

    //   await user.addImage(image);
    // }

    // // Upload and associate the image with the user using Cloudinary
    // const uploadedImage = [];

    // for (const imageFile of image) {
    //   const { url } = imageFile;
    //   const image = await Image.upload(imageFile);
    //   uploadedImage.push({ url: image.url });
    // }

    // await user.addImage(uploadedImage);

    res.status(201).json({ message: 'User created successfully', user, login, image });
  } catch (error) {
    console.error('Error in postCreateUser:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getUsers,
    getUserByIdHandler,
    postCreateUser,
};