const mongoose = require("mongoose");

const conn = async (url) => {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  conn,
};
