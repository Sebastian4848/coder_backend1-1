const express = require("express");
const router = express.Router();
// const { 
//     getProducts,
//     getProductById,
//     addProduct,
//     updateProduct,
//     deleteProduct
// } = require("../controllers/product.controller");

// router.get("/", getProducts);
// router.get("/:pid", getProductById);
// router.post("/", addProduct);
// router.put("/:pid", updateProduct);
// router.delete("/:pid", deleteProduct);

// module.exports = router;

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Obtener todos los productos
router.get("/", getProducts);

// Obtener un producto por ID
router.get("/:pid", getProductById);

// Agregar un nuevo producto
router.post("/", addProduct);

// Actualizar un producto por ID (sin modificar el ID)
router.put("/:pid", updateProduct);

// Eliminar un producto por ID
router.delete("/:pid", deleteProduct);

module.exports = router;