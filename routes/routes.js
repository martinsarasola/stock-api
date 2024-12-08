const express = require("express");
const router = express.Router();
const Products = require("../models/productmodel");
const authMiddleware = require("../middleware/authMiddleware");

// Conseguir todo el STOCK de PRODUCTOS
router.get("/productos", async (req, res) => {
  const products = await Products.find();
  res.status(200).send(products);
});

// Crear nuevo producto
router.post("/productos", authMiddleware, async (req, res) => {
  const body = req.body;
  try {
    const nuevoProducto = await Products.create(body);
    res.status(201).send(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res
      .status(400)
      .send({ mensaje: "Error al crear el producto", error: error.message });
  }
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

// Eliminar producto por ID
router.delete("/productos/:id", async (req, res) => {
  try {
    const productoEliminado = await Products.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).send({ mensaje: "Producto no encontrado" });
    }
    res.status(200).send({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al eliminar el Producto", error });
  }
});

// Obtener PRODUCTOS por categoria
router.get("/productos/categoria/:categoria", async (req, res) => {
  try {
    const products = await Products.find({ categoria: req.params.categoria });

    if (!products) {
      return res
        .status(404)
        .send({ mensaje: "No se encontró el producto especificado" });
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ mensaje: "Hubo un error en el servidor", error });
  }
});

// Obtener PRODUCTOS con bajo stock
router.get("/productos/bajo-stock/:cantidad", async (req, res) => {
  try {
    const products = await Products.find({
      cantidad: { $lt: req.params.cantidad },
    });

    if (!products) {
      return res
        .status(404)
        .send({ mensaje: "No se encontró el producto especificado" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ mensaje: "Hubo un error en el servidor", error });
  }
});

module.exports = router;
