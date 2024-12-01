const express = require("express");
const productRoutes = require("./routes/routes.js");
const dbconnect = require("./config/db.js");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;

dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("El servidor está corriendo en el puerto 3000");
    });
  })
  .catch((error) => {
    console.log("No se pudo conectar al servidor: " + error);
  });
