const { conn, Product, Image, Category } = require('../database');
const {
  getAllProducts,
  getProductsByName,
  getProductsByNameAndDescription,
  getProductById,
  getProductsByManufacturer,
  getProductsByOrigin,
} = require('../controllers/productsController');
const { productValidation } = require('../../../client/src/components/validations');

const getProducts = async (req, res) => {
  const { name } = req.query;

  try {
    let products;

    if (name) {
      products = await getProductsByName(name);
    } else {
      products = await getAllProducts();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the products' });
  }
};

const getProductByIdHandler = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductByIdHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the product by ID' });
  }
};

const getProductsByNameAndDescriptionHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const products = await getProductsByNameAndDescription(name);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProductsByNameAndDescriptionHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the products by name and description' });
  }
};

const getProductsByManufacturerHandler = async (req, res) => {
  const { manufacturer } = req.query;

  try {
    const products = await getProductsByManufacturer(manufacturer);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProductsByManufacturerHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the products by manufacturer' });
  }
};

const getProductsByOriginHandler = async (req, res) => {
  const { origin } = req.query;

  try {
    const products = await getProductsByOrigin(origin);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProductsByOriginHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the products by origin' });
  }
};

const postCreateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      manufacturer,
      origin,
      price,
      discount,
      stock,
      isActive,
      category,
      images,
      captions, // User-provided image captions
    } = req.body;

    // Validate the input data
    const errors = productValidation({
      name,
      description,
      manufacturer,
      origin,
      price,
      discount,
      stock,
      isActive,
      category,
      images,
    });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Retrieve the category hierarchy from the database
    const categories = await Category.findAll({ order: [['categoryId', 'asc']] });

    // Find the selected category and its subcategories
    const selectedCategory = categories.find((c) => c.categoryId === category);
    const subcategories = selectedCategory ? await selectedCategory.getSubcategories() : [];

    // Associate the product with the selected category
    const product = await Product.create({
      name,
      description,
      manufacturer,
      origin,
      price,
      discount,
      stock,
      isActive,
    });

    if (selectedCategory) {
      await product.setCategory(selectedCategory);
    }

    // Associate the product with the selected subcategories
    for (const subcategory of subcategories) {
      await product.setCategory(subcategory);
    }

    // Upload and associate the images with the product using Cloudinary and Multer
    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const caption = captions[i];

      const uploadResults = await Image.uploadProduct([image]);

      for (const uploadResult of uploadResults) {
        const { url } = uploadResult;

        const uploadedImage = await Image.create({
          url,
          caption,
        });

        await product.addImages(uploadedImage);
        uploadedImages.push({ url, caption });
      }
    }

    // Return the created product with category and its parent categories
    const createdProduct = await Product.findByPk(product.productId, {
      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['imageId', 'url', 'caption'],
        },
        {
          model: Category,
          as: 'category',
          include: [
            {
              model: Category,
              as: 'parent',
              attributes: ['categoryId', 'name'],
              include: [
                {
                  model: Category,
                  as: 'parent',
                  attributes: ['categoryId', 'name'],
                },
              ],
            },
          ],
          attributes: ['categoryId', 'name'],
        },
      ],
    });

    res.status(200).json({ message: 'Product created successfully', createdProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductByIdHandler,
  getProductsByNameAndDescriptionHandler,
  getProductsByManufacturerHandler,
  getProductsByOriginHandler,
  postCreateProduct,
};

    // ROLLBACK PROTECTION! :D 
    // // Upload and associate the images with the product using Cloudinary
    // const uploadedImages = [];

    // for (const image of images) {
    //   const { url, caption } = image;

    //   if (url.startsWith('http')) {
    //     // URL image
    //     const urlImage = await Image.create({
    //       url,
    //       caption,
    //     });

    //     await product.addImages(urlImage);
    //     uploadedImages.push({ url, caption });
    //   } else {
    //     // Local file upload
    //     const cloudinaryImage = await Image.upload(image); // Upload image to Cloudinary

    //     await product.addImages(cloudinaryImage);
    //     uploadedImages.push({ url: cloudinaryImage.url, caption });
    //   }
    // }