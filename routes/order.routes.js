const router = require("express").Router();
const orderControllers = require("../controllers/order.controllers");
const { check } = require("express-validator");
const auth = require('../middlewares/isAuth');
router.get('/', auth.isAuth, orderControllers.getOrder)
router.post('/',
    auth.isAuth,
    check('amount')
        .not().isEmpty()
        .withMessage('amount is required')
        .isInt({ min: 1 })
        .withMessage('amount must be positive'),
    orderControllers.addItem
)
router.post('/delete', auth.isAuth, orderControllers.deleteOrder)
module.exports = router;
