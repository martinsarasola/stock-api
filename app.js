const express = require("express");
const productRoutes = require("./routes/routes");
const dbconnect = require("./config/db.js");

const app = express();

app.use(express.json());

app.use(productRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello wolllll");
});

dbconnect()
  .then(() => {
    app.listen(3000, () => {
      console.log("El servidor está corriendo en el puerto 3000");
    });
  })
  .catch((error) => {
    console.log("No se pudo conectar al servidor: " + error);
  });
