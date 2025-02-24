const products = require("../db/products.json");

const getAllProducts = () => {return products.length ? products : null};

const getProduct = (id) => products.find((product) => product.id == id);

const saveProduct = (data) => {
    const newProduct = { id: products.length + 1, ...data };
    products.push(newProduct);
    return newProduct;
};

const updateProductById = (id, data) => {
    const index = products.findIndex((product) => product.id === parseInt(id));
    console.log(id)
    if (index !== -1) {
        products[index] = { ...products[index], ...data };
        return products[index];
    }
    return null;
};

const deleteProductById = (id) => {
    const index = products.findIndex((product) => product.id == id);
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = { getAllProducts, getProduct, saveProduct, updateProductById, deleteProductById };