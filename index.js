const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const ideasRouter = require("./routes/ideas");

const connectDB = require("./config/db");
connectDB();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static("./public"));

app.use("/api/ideas", ideasRouter);

app.listen(5000, () => {
  console.log("Listenting at port 5000");
});
