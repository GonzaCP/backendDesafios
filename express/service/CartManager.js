import fs from 'fs'
import ProductManager from './ProductManager.js'

const products = new ProductManager("/products.json")


class CartManager {  
    constructor (path) {
        this.dirName = './files'
        this.fileName = this.dirName + path              
        this.fs = fs
    }        

   
    addCart = async() => {       
        let newCart = {
            products: []
        }      
        try {
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readCartParse = JSON.parse(readCart)
            if(readCartParse.length === 0) {
                newCart.id = 0
            } else {
                newCart.id = readCartParse[readCartParse.length - 1].id + 1
            } 
            readCartParse.push(newCart)
            await fs.promises.writeFile(this.fileName, JSON.stringify(readCartParse, null, 2))
        } catch (error) {
             throw Error (`${error}`)
        }         

    }

    getProductsByIdCart = async(id) => {
        try {
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readCartParse = JSON.parse(readCart)
            let findId = readCartParse.find((cart => cart.id === id))  
            if (findId) {                                                                             
                return findId.products
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch (error) {
            throw Error (`El id recibido no coincide: ${error}`)
        }        
    }

    getCarts = async() => {
        try {
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readCartParse = JSON.parse(readCart)
            return readCartParse
        } catch(error) {
            throw Error (`${error}`)
        }

    }

    
    addProductToCart = async(idCart, idProd) => {
        try {
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readCartParse = JSON.parse(readCart)
            let findId = readCartParse.find((cart => cart.id === idCart))  
            if (!findId) {    
                throw Error ("id not found")                
            } 

            let findProduct = await products.getProductById(idProd)        
           
            let onlyOne = findProduct.title
            let newProduct = {
                quantity: 1,
                product: onlyOne
            }         

            let busquedaTitle = findId.products.find((product => product.product === findProduct.title))  
            if (busquedaTitle) {   
                busquedaTitle.quantity++ 
                return await fs.promises.writeFile(this.fileName, JSON.stringify(readCartParse, null, 2))     
            } 

            findId.products.push(newProduct)
            await fs.promises.writeFile(this.fileName, JSON.stringify(readCartParse, null, 2)) 
          
            } catch (error) {
                throw Error (`El id recibido no coincide: ${error}`)
            }      
    }

}


export default CartManager