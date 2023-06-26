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

    let userImage;

    // Check if an image file was uploaded
    if (req.file) {
      // Upload the image file and create a new image record
      userImage = await Image.upload(req.file);
    } else if (image) {
      // If no file was uploaded, check if an image URL is provided
      userImage = await Image.create({ url: image });
    } else {
      // If neither file nor URL is provided, use the default image URL
      const defaultImageURL =
        'https://res.cloudinary.com/dwavcdgpu/image/upload/v1687509865/default-userImage_yqbaz3.png';
      userImage = await Image.create({ url: defaultImageURL });
    }

    await user.setImage(userImage);

    const createdUser = await User.findByPk(user.userId, {
      include: [Login, Image],
    });

    res.status(201).json({ message: 'User created successfully', createdUser });

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