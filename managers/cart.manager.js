const fs = require("fs").promises;
const path = require("path");

const cartsPath = path.join(__dirname, "../db/carts.json");

class CartManager {
    async getCarts() {
        try {
            const data = await fs.readFile(cartsPath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveCarts(carts) {
        await fs.writeFile(cartsPath, JSON.stringify(carts, null, 2));
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
        carts.push(newCart);
        await this.saveCarts(carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === parseInt(id)) || null;
    }

    // async addProductToCart(cid, pid) {
    //     const carts = await this.getCarts();
    //     const cart = carts.find(c => c.id === parseInt(cid));
    //     if (!cart) return null;

    //     const existingProduct = cart.products.find(p => p.product === parseInt(pid));
    //     if (existingProduct) {
    //         existingProduct.quantity += 1;
    //     } else {
    //         cart.products.push({ product: parseInt(pid), quantity: 1 });
    //     }

    //     await this.saveCarts(carts);
    //     return cart;
    // }

    async addProductToCart(cid, pid, quantity = 1) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === parseInt(cid));
        if (!cart) return null;
    
        const productId = parseInt(pid); // Asegurar que pid siempre sea un número
        const existingProduct = cart.products.find(p => p.product === productId);
    
        if (existingProduct) {
            existingProduct.quantity += quantity; // Sumar correctamente la cantidad enviada
        } else {
            cart.products.push({ product: productId, quantity });
        }
    
        await this.saveCarts(carts);
        return cart;
    }
    
}

module.exports = new CartManager();