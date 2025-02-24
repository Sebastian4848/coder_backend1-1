// const products = require("../db/products.json");

const fs = require("fs").promises;
const path = require("path");
const productsPath = path.join(__dirname, "../db/products.json");



// Función para leer los productos desde el archivo JSON
const readProducts = async () => {
    try {
        const data = await fs.readFile(productsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de productos:", error);
        return [];
    }
};

// Función para escribir en el archivo JSON
const writeProducts = async (products) => {
    try {
        await fs.writeFile(productsPath, JSON.stringify(products, null, 2), "utf-8");
    } catch (error) {
        console.error("Error al escribir en el archivo de productos:", error);
    }
};

// Obtener todos los productos
const getAllProducts = async () => {
    return await readProducts();
};

// Obtener un producto por ID
const getProductByIdFromDB = async (id) => {
    const products = await readProducts();
    return products.find((product) => product.id === id) || null;
};

// Agregar un nuevo producto
const saveProduct = async (newProduct) => {
    const products = await readProducts();

    // Generar un ID único
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithId = { id: newId, ...newProduct };

    products.push(productWithId);
    await writeProducts(products);
    return productWithId;
};

// Actualizar un producto por ID
const updateProductById = async (id, updatedData) => {
    const products = await readProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) return null;

    // Mantener el ID original
    products[index] = { ...products[index], ...updatedData };
    await writeProducts(products);
    return products[index];
};

// Eliminar un producto por ID
const deleteProductById = async (id) => {
    const products = await readProducts();
    const filteredProducts = products.filter((product) => product.id !== id);

    if (products.length === filteredProducts.length) return false; // No se encontró el producto

    await writeProducts(filteredProducts);
    return true;
};

module.exports = {
    getAllProducts,
    getProductByIdFromDB,
    saveProduct,
    updateProductById,
    deleteProductById,
};

//!-------------------
// class ProductManager {
//     async getProducts() {
//         try {
//             const data = await fs.readFile(productsPath, "utf-8");
//             return JSON.parse(data);
//         } catch (error) {
//             return [];
//         }
//     }

//     async saveProducts(products) {
//         await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
//     }

//     async addProduct(product) {
//         const products = await this.getProducts();
//         product.id = products.length ? products[products.length - 1].id + 1 : 1;
//         products.push(product);
//         await this.saveProducts(products);
//         return product;
//     }

//     async getProductById(id) {
//         const products = await this.getProducts();
//         return products.find(p => p.id === parseInt(id)) || null;
//     }

//     async deleteProduct(id) {
//         let products = await this.getProducts();
//         const newProducts = products.filter(p => p.id !== parseInt(id));
//         if (newProducts.length === products.length) return null; // No encontrado
//         await this.saveProducts(newProducts);
//         return true;
//     }

//     async updateProduct(id, updatedData) {
//         let products = await this.getProducts();
//         const index = products.findIndex(p => p.id === parseInt(id));
//         if (index === -1) return null;

//         products[index] = { ...products[index], ...updatedData, id: parseInt(id) };
//         await this.saveProducts(products);
//         return products[index];
//     }
// }

// module.exports = new ProductManager();

//!---------------------------


// const getAllProducts = () => {return products.length ? products : null};

// const getProduct = (id) => products.find((product) => product.id == id);

// const saveProduct = (data) => {
//     const newProduct = { id: products.length + 1, ...data };
//     products.push(newProduct);
//     return newProduct;
// };

// const updateProductById = (id, data) => {
//     const index = products.findIndex((product) => product.id === parseInt(id));
//     console.log(id)
//     if (index !== -1) {
//         products[index] = { ...products[index], ...data };
//         return products[index];
//     }
//     return null;
// };

// const deleteProductById = (id) => {
//     const index = products.findIndex((product) => product.id == id);
//     if (index !== -1) {
//         products.splice(index, 1);
//         return true;
//     }
//     return false;
// };

// module.exports = { getAllProducts, getProduct, saveProduct, updateProductById, deleteProductById };