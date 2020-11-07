const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const session = require("express-session");
const StoreSession = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const DB_URL = "mongodb://localhost:27017/onlineShop"
const homeRouter = require("./routes/home.routes")
const productRouter = require("./routes/product.routes")
const authRouter = require("./routes/auth.routes")
const cartRouter = require('./routes/cart.routes')
const orderRouter = require('./routes/order.routes')

const STORE = new StoreSession({
  uri: DB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "this my secret key for express-session bla bla bla .......",
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 100,
    },
    store: STORE,
  })
);
app.use(express.static(path.join(__dirname + "assets/images")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);
app.use("/", homeRouter);
app.use("/product", productRouter);
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.listen(5000, () => console.log("listening to port 5000"));
