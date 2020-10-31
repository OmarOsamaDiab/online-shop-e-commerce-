const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/onlineShop";
const prodSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  category: String,
});
const Product = mongoose.model("product", prodSchema);
exports.getAllProducts = async (category) => {
  await mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const products = (category) ? await Product.find({ category }) : await Product.find()
  await mongoose.disconnect();
  return products;
};

exports.getProductById = async (id) => {
  await mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const products = await Product.findById(id)
  await mongoose.disconnect();
  return products;
};