const router = require("express").Router();
const cartControllers = require("../controllers/cart.controllers");
const { check } = require("express-validator");
const auth = require('../middlewares/isAuth');
router.get('/', auth.isAuth, cartControllers.getCart)

router.post('/',
    auth.isAuth,
    check('amount')
        .not().isEmpty()
        .withMessage('amount is required')
        .isInt({ min: 1 })
        .withMessage('amount must be positive'),
    cartControllers.addItem
);

router.post('/save', auth.isAuth,
    check('amount')
        .not().isEmpty()
        .withMessage('amount is required')
        .isInt({ min: 1 })
        .withMessage('amount must be positive'),
    cartControllers.saveCart);

router.post('/delete', auth.isAuth, cartControllers.deleteCart)
router.post('/deleteAll', auth.isAuth, cartControllers.deleteAll)
module.exports = router;
