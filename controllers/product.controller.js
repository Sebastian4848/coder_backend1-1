
const {
    getAllProducts,
    getProductByIdFromDB,
    saveProduct,
    updateProductById,
    deleteProductById
} = require("../managers/product.manager");

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const allProducts = await getAllProducts();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await getProductByIdFromDB(parseInt(pid));
        if (!product) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

// Agregar un nuevo producto
const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const savedProduct = await saveProduct(newProduct);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto" });
    }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedData = req.body;
        const updatedProduct = await updateProductById(parseInt(pid), updatedData);
        if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const deleted = await deleteProductById(parseInt(pid));
        if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };

//!-----------------

// const {
//     getAllProducts,
//     getProduct,
//     saveProduct,
//     updateProductById,
//     deleteProductById
// } = require("../managers/product.manager");


// const getProducts = (req, res) => {
//     try {
//         const allProducts = getAllProducts(); // usa el Manager
//         if (allProducts) {
//             res.status(200).json(allProducts);
//         } else {
//             res.status(400).send("No se encontraron productos");
//         }
//     } catch (error) {
//         console.error("Error al obtener los productos:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// };

// const getProducts = (req, res) => {
//     try {
//         const products = getAllProducts();
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error al obtener los productos:", error);
//         res.status(500).json({ error: "Error al obtener los productos", details: error.message });
//     }
// };

// //! GET (OK)
// app.get("/api/products/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     // console.log("-----> ", req);
//     const product = products.find((product) => product.id === parseInt(pid));
//     if (!product) {
//       return res.status(404).json({ error: "Producto no encontrado" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener el producto", details: error.message });
//   }
// });


// const getProductById = (req, res) => {
//     try {
//         const product = getProduct(req.params.pid);
//         product ? res.status(200).json(product) : res.status(404).json({ error: "Producto no encontrado" });
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener el producto", details: error.message });
//     }
// };


// //! POST (OK)
// app.post("/api/products", (req, res) => {
//   try {
//     const { title, description, code, price, status, stock, category, thumbnails } = req.body;
//     const newProduct = {
//       id: products.length + 1,
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails
//     };
//     products.push(newProduct);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error("Error al agregar el producto:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });

// const addProduct = (req, res) => {
//     try {
//         const newProduct = saveProduct(req.body);
//         res.status(201).json(newProduct);
//     } catch (error) {
//         res.status(500).json({ error: "Error al agregar producto", details: error.message });
//     }
// };

// //! PUT (OK)
// app.put("/api/products/update-product", (req, res) => {
//   try {
//     const { id } = req.query;
//     const { title, description, code, price, status, stock, category, thumbnails } = req.body;
//     if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
//       return res.status(400).send("faltan datos");
//     }
//     const productIndex = products.findIndex((product) => product.id === parseInt(id));
//     if (productIndex !== -1) {
//       // -1 si no lo encuentra y la posicion si lo encuentra
//       products[productIndex] = {
//         id: parseInt(id),
//         title,
//         description,
//         code,
//         price,
//         status,
//         stock,
//         category,
//         thumbnails
//       };
//       res.status(200).json(products[productIndex]);
//       // Se puede usar return para cortar la secuencia
//     } else {
//       res.status(404).send("Producto no encontrado");
//     }
//   } catch (error) {
//     console.error("Error al actualizar el producto:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// }
// );


// const updateProduct = (req, res) => {
//     try {
//         const updatedProduct = updateProductById(req.params.pid, req.body);
//         updatedProduct ? res.status(200).json(updatedProduct) : res.status(404).json({ error: "Producto no encontrado" });
//     } catch (error) {
//         console.error("Error al actualizar el producto:", error);
//         res.status(500).json({ error: "Error al actualizar el producto", details: error.message });
//     }
// };

// //! DELETE (OK)
// app.delete("/api/products/delete-product", (req, res) => {
//   try {
//     const { id } = req.query;
//     console.log(id)
//     const productIndex = products.findIndex((product) => product.id === parseInt(id));
//     if (productIndex !== -1) {
//       products.splice(productIndex, 1);
//       res.status(200).send("Producto eliminado");
//     } else {
//       res.status(404).send("Producto no encontrado");
//     }
//   } catch (error) {
//     console.error("Error al eliminar el producto:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });

// const deleteProduct = (req, res) => {
//     try {
//         const success = deleteProductById(req.params.pid);
//         success ? res.status(200).json({ message: "Producto eliminado" }) : res.status(404).json({ error: "Producto no encontrado" });
//     } catch (error) {
//         console.error("Error al eliminar el producto:", error);
//         res.status(500).json({ error: "Error al eliminar el producto", details: error.message });
//     }
// };

// module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
