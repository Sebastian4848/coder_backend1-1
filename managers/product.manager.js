const products = require("../db/products.json");

const getAllProducts = () => {
    return products.length ? products : null
};

module.exports = { getAllProducts };

//* Managers son conectores directos con la DB

//* SQL  no SQL  QUERIES (CONSULTAS) -> a la DB