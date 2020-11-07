const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/onlineShop";
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    productId: String,
    amount: Number,
    userId: String,
    timeStamp: Date
});
const CartItem = mongoose.model("cart", cartSchema);
exports.getCartByUser = async userId => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const cart = await CartItem.find({ userId }, {}, { sort: { timeStamp: -1 } })
    return cart
}
exports.addNewItem = async data => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const { userId, productId } = data
    const [cart] = await CartItem.find({ userId, productId })
    let item;
    if (cart) {
        const { _id } = cart
        console.log(cart)
        data.amount += +cart.amount
        item = await CartItem.updateOne({ _id }, data)
    }
    else {
        item = new CartItem(data)
        await item.save()
    }
    await mongoose.disconnect();
    return item
}
exports.saveCart = async (_id, data) => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const item = await CartItem.updateOne({ _id }, data)
    return item
}
exports.deleteCart = async (_id) => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    await CartItem.deleteOne({ _id })
}
exports.deleteAll = async (userId) => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    await CartItem.deleteMany({ userId })
}
exports.CartItem = CartItem