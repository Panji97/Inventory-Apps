const dotenv = require("dotenv");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

var properiesRouter = require("./routes/properties.routes");
var usersRouter = require("./routes/users.routes");

dotenv.config({ path: "./.env" });

var app = express();

// mongo db connection

const DB = process.env.MONGO_URI.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

main()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB);
}

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/properties", properiesRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
