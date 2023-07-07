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
const { productValidation } = require("./validations");

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
      images,
      caption,
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
      caption,
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
      (c) => c.categoryId === parseInt(category, 10),
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

    let uploadedImage;

    if (req.file) {
      // If an image file was uploaded, create a new image record
      const imageUrl = req.file.path;
      uploadedImage = await Image.create({ url: imageUrl, caption });
      await product.addImages(uploadedImage);
    } else if (images) {
      // If an image URL is provided, create a new image record
      uploadedImage = await Image.create({ url: images, caption });
      await product.addImages(uploadedImage);
    }

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
    console.error("Error in postCreateProduct:", error);
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
      images,
      caption,
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

    let uploadedImage;

    if (req.file) {
      // If an image file was uploaded, create a new image record
      const imageUrl = req.file.path;
      uploadedImage = await Image.create({ url: imageUrl, caption });
      await product.setImages([uploadedImage]);
    } else if (images) {
      // If an image URL is provided, create a new image record
      uploadedImage = await Image.create({ url: images, caption });
      await product.setImages([uploadedImage]);
    }

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
