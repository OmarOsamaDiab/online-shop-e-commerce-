const mongoose = require("mongoose");
const { CartItem } = require('./cart.model')
const DB_URL = "mongodb://localhost:27017/onlineShop";
const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    productId: String,
    amount: Number,
    userId: String,
    status: String,
    timeStamp: Date
});
const OrderItem = mongoose.model("order", orderSchema);

exports.getOrderByUser = async userId => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const order = await OrderItem.find({ userId }, {}, { sort: { timeStamp: -1 } })
    return order
}
exports.addNewItem = async data => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const { userId, productId } = data
    const [order] = await OrderItem.find({ userId, productId })
    let item;
    if (order) {
        const { _id } = order
        data.amount += +order.amount
        item = await OrderItem.updateOne({ _id }, data)
    }
    else {
        item = new OrderItem(data)
        await item.save()
    }
    await CartItem.deleteOne({ userId, productId })
    await mongoose.disconnect();
    return item
}
exports.deleteOrder = async (_id) => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    await OrderItem.deleteOne({ _id })
}