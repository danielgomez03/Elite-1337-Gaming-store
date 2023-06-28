const { conn, Product, Image, Category } = require("../database");
const {
  getAllProducts,
  getProductsByName,
  getProductsByNameAndDescription,
  getProductById,
  getProductsByManufacturer,
  getProductsByOrigin,
} = require("../controllers/productsController");
const { getParentCategories } = require("../controllers/categoriesController");
const {
  productValidation,
} = require("../../../client/src/components/validations");

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
    console.error("Error in getProducts:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the products" });
  }
};

const getProductByIdHandler = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductByIdHandler:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the product by ID" });
  }
};

const getProductsByNameAndDescriptionHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const products = await getProductsByNameAndDescription(name);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProductsByNameAndDescriptionHandler:", error);
    res.status(500).json({
      error:
        "An error occurred while retrieving the products by name and description",
    });
  }
};

const getProductsByManufacturerHandler = async (req, res) => {
  const { manufacturer } = req.params;

  try {
    const products = await getProductsByManufacturer(manufacturer);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProductsByManufacturerHandler:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the products by manufacturer",
    });
  }
};

const getProductsByOriginHandler = async (req, res) => {
  const { origin } = req.params;
  console.log("Origin:", origin); // Add this line for debugging

  try {
    const products = await getProductsByOrigin(origin);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProductsByOriginHandler:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the products by origin",
    });
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
    } = req.body;

    const images = req.body.images || [];
    const captions = req.body.images.map((image) => image.caption);
    // Convert the category value to a number if it's a string
    const categoryId = parseInt(category, 10); // Convert category to a number if it's a string

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
      category: categoryId,
      images,
      captions,
    });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Retrieve the category hierarchy from the database
    const categories = await Category.findAll({
      order: [["categoryId", "asc"]],
    });

    // Find the selected category and its subcategories
    const selectedCategory = categories.find(
      (c) => c.categoryId === categoryId,
    );

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
      categoryId: selectedCategory.categoryId,
    });

    await product.setCategory(selectedCategory);

    // Upload and associate the images with the product using Cloudinary and Multer
    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const caption = captions[i];

      if (image.url) {
        // Image provided as a text URL
        const uploadedImage = await Image.create({
          url: image.url,
          caption,
        });

        await product.addImages(uploadedImage);
        uploadedImages.push({ url: image.url, caption });
      } else {
        // Image uploaded as a file
        const uploadResults = await Image.uploadProduct([image]);

        for (const uploadResult of uploadResults) {
          const { url, caption } = uploadResult;

          const uploadedImage = await Image.create({
            url,
            caption,
          });

          await product.addImages(uploadedImage);
          uploadedImages.push({ url, caption });
        }
      }
    }

    // Add the uploadedImages array to the req.body
    req.body.images = uploadedImages;

    // Return the created product with category and its parent categories
    const createdProduct = await Product.findByPk(product.productId, {
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
    });

    res
      .status(200)
      .json({ message: "Product created successfully", createdProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putUpdateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
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
    });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Find the product to update
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the category is provided
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category is required for product update" });
    }

    // Update the product with the new data
    await product.update({
      name,
      description,
      manufacturer,
      origin,
      price,
      discount,
      stock,
      isActive,
    });

    // Associate the product with the selected category
    const selectedCategory = await Category.findByPk(category);
    if (!selectedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    await product.setCategory(selectedCategory);

    // Return the updated product
    const updatedProduct = await Product.findByPk(productId, {
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
    });

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
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
  putUpdateProduct,
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
