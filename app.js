const fs = require("fs").promises;
const path = require("path");
const productsPath = path.join(__dirname, "db/products.json");
const express = require("express");
const app = express();
var logger = require("morgan");
const routes = require("./routes/index");

const multer = require("multer");

// Config Multer
const upload = multer({ dest: "uploads/" });

// db de productos
const products = require("./db/products.json");


//? MIDELLWARES
app.use(express.json()); //* BODY {vacío} - si implemento express.json() -> {data}
app.use(express.urlencoded({ extended: true })); //* FORMULARIOS - {vacío}
app.use(logger("dev"));

app.use("static", express.static(path.join(__dirname, "public")));

function miMiddleware(req, res, next) {
  console.log("Time:", Date());
  next();
}

app.use(miMiddleware);

//? CORS CONFIG - DOMINIOS que pueden acceder a esta API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //* Definiendo una lista de dominios permitidos
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


//? ENDPOINTS - MODULARIZADOS
// const routes = require("./routes/index");
app.use("/", routes);


//? MANEJO DE RUTAS NO ENCONTRADAS
app.use((req, res) => {
  res.status(404).send(
    `<div style='text-align: center; font-family: Arial;'>
          <h1>404 Not Found</h1>
          <p>La ruta solicitada no existe</p>
        </div>`
  );
});

module.exports = app;

//? ENDPOINTS - SIN MODULARIZAR
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
// })

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

