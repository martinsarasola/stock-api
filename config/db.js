const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado exitosamente a la base de datos");
  } catch (error) {
    console.log("Ha ocurrido un error: " + error);
  }
};

module.exports = dbconnect;
