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
      console.log("error en handler")
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const getProductCommentsHandler = async (req,res) => {

    try{
        const { productId } = req.params;
        const comment = await getProductComments(productId);
        res.status(200).json(comment);
    }
    catch (error){
        res.status(400).json({message:error.message})
    }
}
const getCommentsAllProductsHandler = async (req,res) => {
    try {
        const products = await getAllCommentsProducts();
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }

}
const getUserCommentsHandler = async (req,res) => {
    try {
        const { userId } = req.params;
        const comments = await getUserComments(userId);
        res.status(200).json( comments );
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const deleteCommentHandler = async (req,res) => {
  try {
    const { userId, productId } = req.body;
    await deleteComment(userId, productId);
    res.status(200).json({message:"comment deleted"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
  module.exports = {
    getCommentsAllProductsHandler,
    getProductCommentsHandler,
    addCommentHandler,
    getUserCommentsHandler, 
    deleteCommentHandler,
};