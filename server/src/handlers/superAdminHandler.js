const { User, Product, Rating, Comment } = require("../database");

const patchChangeUserRoleHandler = async (req, res) => {
  const { userId } = req.params;
  const { userRole } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.userRole = userRole;
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in patchChangeUserRoleHandler:", error);
    res
      .status(500)
      .json({ error: "An error occurred while changing user role" });
  }
};

const deleteUserHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.destroy();

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUserHandler:", error);
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
};

const deleteProductHandler = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await product.destroy();

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProductHandler:", error);
    res.status(500).json({ error: "An error occurred while deleting product" });
  }
};

const deleteRatingHandler = async (req, res) => {
  const { ratingId } = req.params;

  try {
    const rating = await Rating.findByPk(ratingId);

    if (!rating) {
      return res
        .status(404)
        .json({ success: false, message: "Rating not found" });
    }

    await rating.destroy();

    res
      .status(200)
      .json({ success: true, message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRatingHandler:", error);
    res.status(500).json({ error: "An error occurred while deleting rating" });
  }
};

const deleteCommentHandler = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    await comment.destroy();

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCommentHandler:", error);
    res.status(500).json({ error: "An error occurred while deleting comment" });
  }
};

module.exports = {
  patchChangeUserRoleHandler,
  deleteUserHandler,
  deleteProductHandler,
  deleteRatingHandler,
  deleteCommentHandler,
};
