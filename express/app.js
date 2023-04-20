import express from "express"
import ProductManager from "./service/ProductManager.js";

const app = express()
const PORT = 8080

//middleware para capturar datos complejos desde la url ---> req.query
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager("/products.json")


app.get('/', (req, res) => {
    res.send("Holaaa novato")
})

app.get('/products', async(req, res) => {
    try {      
        const products = await productos.getProducts()       
        res.send(products)          
        // const limit = req.query.limit 
        // if(limit) {
        //     const products = await productos.getProducts().slice(0, parseInt(limit))
        //     res.send(products)
        // } else {
        //     res.send(productos.getProducts())
        // }        
    } catch {
        res.send({ message: "No se encuentran productos en la base de datos."})
    }    
})


app.get('/products/:pid', async(req, res) => {
    try {
        const product = await productos.getProductById(parseInt(req.params.pid))
        if(product) {
            res.send(product)
        }       
    } catch {
        res.send({ message: "El id ingresado NO coincide con ningún producto agregado!"})    
    } 
})









app.listen(PORT, () => {
    console.log(`Server escuchando a través del puerto ${PORT}`)
})