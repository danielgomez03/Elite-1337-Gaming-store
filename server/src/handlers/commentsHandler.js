const {
  getAllCommentsProducts,
  addCommentToProduct,
  getProductComments,
  getUserComments,
  deleteComment,
} = require("../controllers/commentsController");

const addCommentHandler = async (req, res) => {
  try {
    const { userId, productId, content } = req.body;
    const comment = await addCommentToProduct(userId, productId, content);

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error in addCommentHandler:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the comment" });
  }
};

const getProductCommentsHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await getProductComments(productId);

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getProductCommentsHandler:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the product comments",
    });
  }
};

const getCommentsAllProductsHandler = async (req, res) => {
  try {
    const products = await getAllCommentsProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getCommentsAllProductsHandler:", error);
    res.status(500).json({
      message:
        "An error occurred while retrieving the comments for all products",
    });
  }
};

const getUserCommentsHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await getUserComments(userId);
    ç;

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getUserCommentsHandler:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the user comments",
    });
  }
};

const deleteCommentHandler = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await deleteComment(userId, productId);

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error in deleteCommentHandler:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the comment" });
  }
};

module.exports = {
  getCommentsAllProductsHandler,
  getProductCommentsHandler,
  addCommentHandler,
  getUserCommentsHandler,
  deleteCommentHandler,
};
