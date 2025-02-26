const CartManager = require("../managers/cart.manager");

const createCart = async (req, res) => {
    try {
        const cart = await CartManager.createCart();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear carrito" });
    }
};

const getCartById = async (req, res) => {
    try {
        const cart = await CartManager.getCartById(req.params.cid);
        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
        res.status(200).json(cart.products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener carrito" });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const updatedCart = await CartManager.addProductToCart(req.params.cid, req.params.pid);
        if (!updatedCart) return res.status(404).json({ error: "Carrito o producto no encontrado" });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
};

module.exports = { createCart, getCartById, addProductToCart };
