const express = require("express");
const app = express();
const port = 3000;
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// Connection to db via mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://root:rootpassword@localhost:27017/";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
// Adding routers
var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Adding routes
app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
