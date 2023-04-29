import { Router } from 'express'
import ProductManager from "../../service/ProductManager.js";


const router = Router()
const productos = new ProductManager("/products.json")


// middleware local
function pruebaMiddleware(req, res, next) {
    console.log("Middleware local --> products.routes.js")
    next()
}

// COPIAR A ROUTER.PRODUCTS.JS
// .get ---> DONE
router.get('/', pruebaMiddleware ,async(req, res) => {    
    try {      
        const products = await productos.getProducts()       
        res.send(products)      
    } catch {
        res.send({ message: "No se encuentran productos en la base de datos."})
    }    
})

router.get('/:pid', async(req, res) => {
    try {
        const product = await productos.getProductById(parseInt(req.params.pid))
        if(product) {
            res.send(product)
        }       
    } catch {
        return res.status(202).send({ status: "ERROR", error: "PRODUCTO NO ENCONTRADO" })
    } 
})



// .post ---> Agrega producto
router.post('/', async(req, res) => {
    try {        
        const {title, description, price, thumbnail, code, stock} = req.body
        await productos.addProduct(title, description, price, thumbnail, code, stock);
        res.status(201).send({mensaje: "Producto creado con éxito! Con título:" + title});   
    } catch {
        res.status(500).send({status: "ERROR", error: "No se puede crear el producto."});
    } 
})



// .put ---> Modifica producto según id ---> DONE
router.put('/:pid', async(req, res) => {
    try {      
        const updateProduct = await productos.updateProduct((parseInt(req.params.pid)), req.body)      
   
        res.status(201).send({mensaje: "Producto modificado con éxito! Con título:" + title}); 
    } catch {
        return res.status(202).send({ status: "ERROR", error: "PRODUCTO NO ENCONTRADO" })      
    } 
})



// .delete ---> Elimina producto según id ---> DONE
router.delete('/:pid', async(req, res) => {
    try {
        const deleteProduct = await productos.deleteProduct(parseInt(req.params.pid))
        
        res.status(201).send({ status: "success", msg: 'Producto eliminado!' })
       
    } catch {
        return res.status(202).send({ status: "ERROR", error: "PRODUCTO NO ENCONTRADO" })      
    } 
})












export default router