import fs from 'fs'


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
    
    addProductToCart = async(idCart) => {
        try {
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readCartParse = JSON.parse(readCart)
            let findId = readCartParse.find((cart => cart.id === idCart))  
            if (!findId) {    
                throw Error ("id not found")                
            } 

            console.log(`Encontré el id: ${idCart}`)
            

            // let newProduct = {
            //     quantity: 1,
            //     id: 1
            // }
          

               
          
            } catch (error) {
                throw Error (`El id recibido no coincide: ${error}`)
            }        




    }






}

//const carts = new CartManager("/carts.json")

//carts.addCart()
//console.log(await carts.getProductsByIdCart(0))
//await carts.addProductToCart(0)




export default CartManager