require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/product");
const usersRouter = require("./routes/user");
const reviewRouter = require("./routes/review");

//express app
const app = express();

//cors
app.use(cors());

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewRouter);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen express app
    app.listen(process.env.PORT, () => {
      console.log(`listening on port`, process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
