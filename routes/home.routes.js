const router = require("express").Router();
const homeControllers = require("../controllers/home.controllers");
router.get(["/", "/product"], homeControllers.getProducts);
module.exports = router;
