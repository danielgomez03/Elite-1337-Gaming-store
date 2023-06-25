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
    const product = await getUserById(productId);
    res.status(200).json(product);
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
      image
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

    // Create and associate the images with the user with text URL
    for (const imageData of image) {
      const { url, caption } = imageData;
      const image = await Image.create({
        url,
        caption,
      });

      await user.addImage(image);
    }

    // Upload and associate the images with the user using Cloudinary
    const uploadedImage = [];

    for (const imageFile of image) {
      const { url, caption } = imageFile;
      const image = await Image.upload(imageFile);
      uploadedImage.push({ url: image.url, caption });
    }

    await user.addImage(uploadedImage);

      res.status(200).json({ message: 'User created successfully', user });

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