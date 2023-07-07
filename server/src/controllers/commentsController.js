const { User, Product, Comment } = require("../database");
// const { Op } = require("sequelize");

const getProductComments = async (productId) => {
  try {
    const comments = await Comment.findAll({
      attributes: ["commentId", "userId", "content", "createdAt"],
      where: { productId },
    });
    console.log(comments.length);
    return comments;
  } catch (error) {
    console.error("Error in getProductComments:", error);
    throw new Error("An error occurred while retrieving the product comments");
  }
};

const addCommentToProduct = async (userId, productId, content) => {
  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      throw new Error("User or product not found");
    }

    const comment = await Comment.create({
      userId,
      productId,
      content,
    });

    return comment;
  } catch (error) {
    console.error("Error in addCommentToProduct:", error);
    throw new Error(
      "An error occurred while adding the comment to the product",
    );
  }
};

const getAllCommentsProducts = async () => {
  try {
    const products = await Product.findAll({
      attributes: ["productId", "name"],
      include: [
        {
          model: Comment,
          attributes: ["userId", "content", "createdAt"],
          required: true,
        },
      ],
    });

    return products;
  } catch (error) {
    console.error("Error in getAllCommentsProducts:", error);
    throw new Error(
      "An error occurred while retrieving the products with comments",
    );
  }
};

const getUserComments = async (userId) => {
  try {
    const comments = await Comment.findAll({
      attributes: ["commentId", "productId", "content", "createdAt"],
      where: { userId },
    });

    return comments;
  } catch (error) {
    console.error("Error in getUserComments:", error);
    throw new Error("An error occurred while retrieving the user comments");
  }
};

const deleteComment = async (userId, productId) => {
  try {
    const comment = await Comment.findOne({
      where: { userId, productId },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    await comment.destroy();

    return;
  } catch (error) {
    console.error("Error in deleteComment:", error);
    throw new Error("An error occurred while deleting the comment");
  }
};

module.exports = {
  getAllCommentsProducts,
  addCommentToProduct,
  getProductComments,
  getUserComments,
  deleteComment,
};
