import express from "express"
import productsRoutes from "./src/routes/products.routes.js"
import cartsRoutes from "./src/routes/carts.routes.js"
import __dirname from "./utils.js"

const app = express()
const PORT = 8080

//middleware para capturar datos complejos desde la url ---> req.query
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
// RUTA ABSOLUTA
//app.use(express.static(__dirname + "public"))




app.get('/', (req, res) => {
    res.send("Holaaa novato")
})











app.listen(PORT, () => {
    console.log(`Server escuchando a través del puerto ${PORT}`)  
})