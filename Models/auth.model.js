const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const DB_URL = "mongodb://localhost:27017/onlineShop";
const authSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model("user", authSchema);

exports.createUser = async (username, email, password) => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const user = await User.findOne({ email })
    if (user)
        throw new Error('user already exists')
    else {
        const newPass = await bcrypt.hash(password, 10)
        const user = new User({
            username,
            email,
            password: newPass
        })
        await user.save()
        await mongoose.disconnect();
        return true
    }
}
exports.loginUser = async (email, password) => {
    await mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    const user = await User.findOne({ email })
    if (!user) throw new Error('user does not exist')
    const status = await bcrypt.compare(password, user.password)
    await mongoose.disconnect()
    if (!status) {
        throw new Error('Invalid password')
    }
    return user._id
}

