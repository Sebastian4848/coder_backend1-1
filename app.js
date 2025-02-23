const fs = require("fs").promises;
const path = require("path");
const productsPath = path.join(__dirname, "db/products.json");

/*
Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080. 
Además de configurar los siguientes endpoints:

El endpoint del método GET a la ruta  ‘/bienvenida’ deberá devolver un html con letras en color azul, 
en una string, dando la bienvenida.
El endpoint del método GET a la ruta ‘/usuario’ deberá devolver un objeto con los datos de 
un usuario falso: {nombre, apellido,edad, correo}

Dado un arreglo de objetos de tipo usuario, realizar un servidor en express que permita 
obtener dichos usuarios.
La ruta raíz ‘/’ debe devolver todos los usuarios
la ruta /:userId debe devolver sólo al usuario con dicho Id.


REQ.QUERY
Dado un arreglo de objetos de tipo usuario, vamos a hacer un filtro por género

La ruta raíz ‘/’ debe devolver todos los usuarios, pero ahora colocaremos un query param con ?, 
indicando que queremos un género específico. En caso de enviarlo sin query, debe devolver a todos 
los usuarios.

*/
const express = require("express");
const app = express();
var logger = require("morgan");

// db de productos
const products = require("./db/products.json");


//? MIDELLWARES
app.use(express.json()); //* BODY {vacío} - si implemento express.json() -> {data}
app.use(express.urlencoded({ extended: true })); //* FORMULARIOS - {vacío}
app.use(logger("dev"));


//? CORS CONFIG - DOMINIOS que pueden acceder a esta API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //* Definiendo una lista de dominios permitidos
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


//? ENDPOINTS - Estamos MODULARIZANDO
const routes = require("./routes/index");
app.use("/", routes);


// app.get("/products", (req, res) => {
//   res.status(200).json(products);
// })

//? ENPOINTS SIN MODULARIZAR
// app.get("/products/", async (req, res) => {
//   try {
//     const data = await fs.readFile(productsPath, "utf-8");
//     const products = JSON.parse(data);
//     res.status(200).json(products);
//     console.log("-----> ", req);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener productos", details: error.message });
//   }
// });

// app.get("/products/:pid", (req , res) => {
// const {pid} = req.params;
// console.log("---------> ", pid);
// res.status(200).send("holis")
// })


//! GET (OK)
app.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    // console.log("-----> ", req);
    const product = products.find((product) => product.id === parseInt(pid));
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto", details: error.message });
  }
});


// //? GET SIN MODULARIZAR
// app.get("/books/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = books.find((book) => book.id === parseInt(id));
//     if (book) {
//       res.status(200).json(book);
//     } else {
//       res.status(404).send("Libro no encontrado");
//     }
//   } catch (error) {
//     console.error("Error al obtener el libro:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });


//! DELETE (OK)
app.delete("/api/products/delete-product", (req, res) => {
  try {
    const { id } = req.query;
    console.log(id)
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.status(200).send("Producto eliminado");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
})


//! POST (OK)
app.post("/api/products", (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = {
      id: products.length + 1,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});


// //? DELETE 
// app.delete("/books/delete-book", (req, res) => {
//   try {
//     const { id } = req.query;
//     const bookIndex = books.findIndex((book) => book.id === parseInt(id));
//     if (bookIndex !== -1) {
//       books.splice(bookIndex, 1);
//       res.status(200).send("Libro eliminado");
//     } else {
//       res.status(404).send("Libro no encontrado");
//     }
//   } catch (error) {
//     console.error("Error al eliminar el libro:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// })


// //? POST
// app.post("/books", (req, res) => {
//   try {
//     const { title, author, year } = req.body;
//     const newBook = {
//       id: books.length + 1,
//       title,
//       author,
//       year,
//     };
//     books.push(newBook);
//     res.status(201).json(newBook);
//   } catch (error) {
//     console.error("Error al agregar el libro:", error);
//     res.status(500).send("Error interno del servidor");
//   }
// });


//! PUT (OK)
app.put("/api/products/update-product", (req, res) => {
  try {
    const { id } = req.query;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
      return res.status(400).send("faltan datos");
    }
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    if (productIndex !== -1) {
      // -1 si no lo encuentra y la posicion si lo encuentra
      products[productIndex] = {
        id: parseInt(id),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
      };
      res.status(200).json(products[productIndex]);
      // Se puede usar return para cortar la secuencia
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
}
);


//* Route not found
app.use((req, res) => {
  res.status(404).send(
    `<div style='text-align: center; font-family: Arial;'>
          <h1>404 Not Found</h1>
          <p>La ruta solicitada no existe</p>
        </div>`
  );
});

module.exports = app;




































// //! Rutas ARCHIVO VIEJO

// // http://localhost:8080/bienvenida
// app.get("/bienvenida", (req, res) => {
//   res
//     .status(200)
//     .send("<h1 style='color: blue;'>Bienvenido a mi servidor</h1>");
// });

// // http://localhost:8080/usuarios
// app.get("/usuarios", (req, res) => {
//   res.status(200).json(users);
// });

// // http://localhost:8080/usuarios/2 - x PARAMS ->
// // //* todo lo que llega por PARAMS o QUERY es de tipo string
// app.get("/usuarios/:userId", (req, res) => {
//   const { userId } = req.params;
//   console.log("------> ", userId);
//   const user = users.find((u) => u.id === Number(userId));
//   if (user) {
//     console.log(" in conditional ", user);
//     res.status(200).json({ success: true, user });
//   } else {
//     res.status(400).send("Usuario no encontrado");
//   }
// });

// // http://localhost:8080?genero=M
// app.get("/", (req, res) => {
//   const { genero } = req.query;
//   console.log("------> ", req);
//   const resultUsers = users.filter((u) => u.genero === genero);
//   if (resultUsers && resultUsers.length > 0) {
//     console.log(" in conditional ", resultUsers);
//     res.status(200).json({ success: true, users: resultUsers });
//   } else {
//     res.status(400).send("Usuarios no encontrados");
//   }
// });

/*
Servidor con GET, POST, PUT, DELETE
Se agregará al código de explicación un método GET al mismo endpoint, con el fin de completar 
los 4 métodos principales.

Se realizará un flujo completo con POSTMAN donde podremos ver trabajando a todos los endpoints 
en conjunto, revisando, 

Dada la frase: “Frase inicial”, realizar una aplicación que contenga un servidor en express, 
el cual cuente con los siguientes métodos: 

GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada 
en la frase en la posición dada (considerar que la primera palabra es la #1).

POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de 
la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ 
la posición en que se agregó dicha palabra.

PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en 
la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga 
la nueva palabra, y en el campo ‘anterior’ la anterior.

DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que 
la primera palabra tiene posición #1).
Utilizar POSTMAN para probar funcionalidad

*/

// let frase = "Frase inicial";

// app.get("/api/frase", (req, res) => {});

// app.get("/api/palabras/:pos", (req, res) => {});

// app.post("/api/palabras", (req, res) => {});

// app.put("/api/palabras/:pos", (req, res) => {});

// app.delete("/api/palabras/:pos", (req, res) => {});

// module.exports = app;
