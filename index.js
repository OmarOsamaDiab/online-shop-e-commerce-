const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname + "assets")));
app.set("view engine", "ejs");
app.listen(5000, () => console.log("listening to port 5000"));