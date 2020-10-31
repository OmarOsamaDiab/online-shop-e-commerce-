const { validationResult } = require("express-validator");
const ProductModel = require("../Models/product.model");
exports.getProducts = async (req, res, next) => {
  try {
    const { category } = req.query
    const products = await ProductModel.getAllProducts(category);
    res.render("index", {
      products,
      isUser: req.session.userId,
      validationErrors: req.flash("validationErrors")[0]
    });
  } catch (error) {
    console.log(error.message);
  }
};
