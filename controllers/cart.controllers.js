const Cart = require('../Models/cart.model')
const { validationResult } = require("express-validator")

exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.getCartByUser(req.session.userId)
        res.render('cart', {
            items: cart,
            isUser: true,
            validationErrors: req.flash("validationErrors")
        })
    } catch (err) {
        console.log(err.message)
    }
}

exports.addItem = async (req, res, next) => {
    try {
        if (validationResult(req).isEmpty()) {
            await Cart.addNewItem({
                productId: req.body.productId,
                userId: req.session.userId,
                amount: req.body.amount,
                price: req.body.price,
                name: req.body.name,
                timeStamp: new Date()
            })
            res.redirect('/cart')
        } else {
            req.flash("validationErrors", validationResult(req).array());
            res.redirect(req.body.redirectTo);
        }
    } catch (err) {
        console.log(err.message)
    }

}
exports.saveCart = async (req, res, next) => {
    try {
        if (validationResult(req).isEmpty()) {
            await Cart.saveCart(
                req.body.cartId,
                {
                    amount: req.body.amount,
                    timeStamp: Date.now()
                }
            )
            res.redirect('/cart')
        } else {
            req.flash("validationErrors", validationResult(req).array());
            res.redirect('/cart');
        }
    } catch (err) {
        console.log(err.message)
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        await Cart.deleteCart(req.body.cartId)
        res.redirect('/cart')
    } catch (err) {
        console.log(err)
    }
}