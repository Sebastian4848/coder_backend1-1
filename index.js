const app = require("./app");
const PORT = 8080;
const displayRoutes = require("express-routemap");


// Levantamos el server en index
app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Server listening on port http://localhost:${PORT}`)
})

