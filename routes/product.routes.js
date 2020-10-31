const router = require("express").Router();
const productControllers = require("../controllers/product.controllers");
const auth = require('../middlewares/isAuth')
router.get("/:id", auth.isAuth, productControllers.getProduct);
module.exports = router;
