import { Router } from "express";   
import CartManager from "../../service/CartManager.js";

const router = Router()
const carts = new CartManager("/carts.json")


router.get('/', (req, res) => {
    res.send("NOVAAATOOOOO")   
})

router.post('/', async(req, res) => {
    const carrito = await carts.creoArchivo()
    // const {product} = req.body
    // await carts.addCart(product)
    // res.status(201).send({mensaje: "Carrito creado con éxito! Con título:"});  
})


router.get('/:cid', (req, res) => {
    

})

router.post('/:cid/product/:pid', (req, res) => {
    

})














export default router