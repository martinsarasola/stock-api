const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/dbStock");
    console.log("Conectado exitosamente a la base de datos");
  } catch (error) {
    console.log("Ha ocurrido un error: " + error);
  }
};

module.exports = dbconnect;
