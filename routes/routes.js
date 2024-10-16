const express = require("express");
const router = express.Router();
const Products = require("../models/productmodel");
const authMiddleware = require("../middleware/authMiddleware");

// Conseguir todo el STOCK de PRODUCTOS
router.get("/productos", authMiddleware, async (req, res) => {
  const products = await Products.find();
  res.status(200).send(products);
});

// Actualizar el STOCK de varios PRODUCTOS
router.put("/productos/actualizar-stock", async (req, res) => {
  try {
    const ids = req.body.id;
    const cantidad = req.body.cantidad;

    const productosActualizados = await Products.updateMany(
      { _id: { $in: ids } },
      { $set: { cantidad: cantidad } }
    );

    if (productosActualizados.matchedCount === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontró el producto especificado." });
    }

    res.status(200).send({ productosActualizados });
  } catch (error) {
    res.status(500).send({ mensaje: "Hubo un error en el servidor.", error });
  }
});
