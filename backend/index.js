require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/product");
const usersRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const addressRouter = require("./routes/address");
const { urlencoded } = require("express");

//express app
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//cors
app.use(cors());

//middleware
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/order/", orderRouter);
app.use("/api/me/addresses", addressRouter);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen express app
    app.listen(port, () => {
      console.log(`listening on port`, port);
    });
  })
  .catch((e) => {
    console.log(e);
  });

export default app;