const Order = require('../Models/order.model')
const { validationResult } = require("express-validator")

exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.getOrderByUser(req.session.userId)
        res.render('order', {
            items: order,
            isUser: true,
        })
    } catch (err) {
        console.log(err.message)
    }
}
exports.addItem = async (req, res, next) => {
    try {
        if (validationResult(req).isEmpty()) {
            await Order.addNewItem({
                productId: req.body.productId,
                userId: req.session.userId,
                amount: +req.body.amount,
                price: +req.body.price,
                name: req.body.name,
                status: 'pending',
                timeStamp: new Date()
            })
            res.redirect('/order')
        } else {
            req.flash("validationErrors", validationResult(req).array());
            res.redirect(req.body.redirectTo);
        }
    } catch (err) {
        console.log(err.message)
    }
}
exports.deleteOrder = async (req, res, next) => {
    try {
        await Order.deleteOrder(req.body.orderId)
        res.redirect('/order')
    } catch (err) {
        console.log(err)
    }
}