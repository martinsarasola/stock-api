const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  categoria: { type: String, required: true },
  fechaIngreso: { type: Date, default: Date.now },
});

const ModelProduct = mongoose.model("productos", productSchema);

module.exports = ModelProduct;
