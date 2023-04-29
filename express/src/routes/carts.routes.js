import { Router } from "express";   
import CartManager from "../../service/CartManager.js";
import ProductManager from "../../service/ProductManager.js";
import fs from "fs"

const router = Router()


// validación de ruta
function pathValidation(path) {
    const pathExist = fs.existsSync(path)
    if(!pathExist) {
        fs.writeFileSync(path, "[]")
    }
}

// creo carts.json
pathValidation("./files/carts.json")

// Instancio la clase
const carts = new CartManager("/carts.json")
const products = new ProductManager("/products.json")

//console.log(carts.getProductsByIdCart(0))

//proof
router.get('/:cid/product/:pid', async(req, res) => {
    
    try {
        const carritoId = await carts.getProductsByIdCart(parseInt(req.params.cid))
        const productId = await products.getProductById(parseInt(req.params.pid))
        
        if(!carritoId) {          
            res.status(202).send({ status: "ERROR", error: `el id: ${cid} no coincide.` })
        }

        res.send(productId)
    } catch (error) {
        return res.status(202).send({ status: "ERROR", error: "PRODUCTO NO ENCONTRADO" })
    }
    


})








router.post('/', async(req, res) => {
    await carts.addCart()
    res.send({ status: "Success", message: "Carrito creado con éxito!" })  
})


router.get('/:cid', async(req, res) => {    
    try {
        const products = await carts.getProductsByIdCart(parseInt(req.params.cid))
        if(!products) {
            res.status(202).send({ status: "ERROR", error: `el id: ${cid} no coincide.` })
        }
        res.send(products)
    } catch (error) {
        return res.status(202).send({ status: "ERROR", error: "PRODUCTO NO ENCONTRADO" })
    }
    
    

})

// router.post('/:cid/product/:pid', async(req, res) => {
    
//     try {
//         const carritoId = await carts.getProductsByIdCart(parseInt(req.params.cid))
//         const productId = await products.getProductById(parseInt(req.params.pid))
        
//         if(!carritoId || productId) {
          
//             res.status(202).send({ status: "ERROR", error: `el id: ${cid} no coincide.` })
//         }

//         //res.send(productId)
//     } catch (error) {
//         return res.status(202).send({ status: "ERROR", error: "PRODUCTO NO ENCONTRADO" })
//     }
    


// })














export default router