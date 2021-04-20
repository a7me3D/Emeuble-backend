const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

// import routes
const auth = require("./routes/auth");
const product = require("./routes/product");
const user = require("./routes/user");
const category = require("./routes/category");
const message = require("./routes/message");

//MongoDB config
require("./loaders/db");
require("./loaders/dbInit");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

// user routes
app.use("/api/auth", auth);
app.use("/api/product", product);
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/message", message);

app.listen(process.env.PORT);
