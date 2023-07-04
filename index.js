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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listenting at port 5000");
});
