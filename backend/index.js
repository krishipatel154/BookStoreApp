const express = require("express");
const { conn } = require("./connection/connection");
const user = require("./routes/user");
const app = express();
require("dotenv").config();
conn("mongodb://127.0.0.1:27017/book-store")
  .then(() => {
    console.log("connected successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/user", user);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
