const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/product.controller");

router.get("/", getProducts);
// router.get("/uno", getBooks);
// router.get("/dos", getBooks);

module.exports = router;