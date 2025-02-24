const express = require("express");
const router = express.Router();
const products = require("./product.route");
// const cartsRoutes = require("./cart.route");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send(
        `<div style='text-align: center; margin-top: 20%; font-size: 2em; font-family: Arial;'>
    <h1>Bienvenido a la primera entrega de Backend 1 - 75240</h1>
    <p>Para ver los productos, ve a <a href="http://localhost:8080/api/products/">/products/</a></p>
    </div>`
    );
});

router.use("/api/products", products);
// router.use("/api/carts", cartsRoutes);

module.exports = router;

