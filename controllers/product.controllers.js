const ProductModel = require("../Models/product.model");
exports.getProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await ProductModel.getProductById(id)
        res.render("product", {
            product,
            isUser: req.session.userId
        });
    } catch (error) {
        console.log(error.message);
        res.status(404)
    }
};
