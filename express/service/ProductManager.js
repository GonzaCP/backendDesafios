import fs from 'fs'
import bcrypt from 'bcrypt'

class ProductManager {

    constructor (path) {
        this.dirName = './files'
        this.fileName = this.dirName + path              
        this.fs = fs
    }   

    creoArchivo = async() => {       
        try {
            if(!this.fs.existsSync(this.fileName)) {            
                await this.fs.promises.mkdir(this.dirName, {recursive: true})
                await this.fs.promises.writeFile(this.fileName, "[]")           
            }    
        } catch (error) {
            throw Error `El archivo se encuentra creado ${error}`
        }    
    }

    addProduct = async(title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {           
           throw Error ("Falta info")     
         } 
       
        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,     
        }

        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")          
            let readProductParse = JSON.parse(readProduct)

            if(readProductParse.length === 0) {
            product.id = 0
            } else {
            product.id = readProductParse[readProductParse.length - 1].id  + 1
            }            
            let busquedaCode = readProductParse.some((product => product.code === code))
            if(busquedaCode) {
                throw Error ("Mismo código")
            }       
            readProductParse.push(product)
            await fs.promises.writeFile(this.fileName, JSON.stringify(readProductParse, null, 2))
        } catch (error) {
             throw Error (`No se puede agregar el producto: ${error}.`)
        }         

    }

    getProducts = async() => {
        let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")
        let readProductParse = JSON.parse(readProduct) 
        return readProductParse    
    }

    getProductById = async(id) => {
        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")  
            let readProductParse = JSON.parse(readProduct)   
            let busquedaCode = readProductParse.find((product => product.id === id))  
            if (busquedaCode) {                
                return busquedaCode
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch (error) {
            throw Error (`El id recibido no coincide: ${error}`)
        } 
    }

    updateProduct = async(id, updateData) => {
        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")  
            let readProductParse = JSON.parse(readProduct)  

            const index = readProductParse.findIndex(product => product.id === id)
            if(index === -1) {
                throw new Error (`Product with id ${id} not found`)
            }
            const updateProduct = {...readProductParse[index], ...updateData, id}
            readProductParse.splice(index, 1, updateProduct)

            await fs.promises.writeFile(this.fileName, JSON.stringify(readProductParse, null, 2))                
            
        } catch (error) {
            throw Error (`El id recibido no coincide: ${error}`)
        }
    }

    deleteProduct = async(id) => {
        try {
            let readProduct = await this.fs.promises.readFile(this.fileName, "utf-8")  
            let readProductParse = JSON.parse(readProduct)  
            let nuevoArray = []
            let busquedaCode = readProductParse.find((product => product.id === id)) 
            if (busquedaCode) {
                nuevoArray = readProductParse.filter((p) => p.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(nuevoArray, null, 2))
            } else {
                throw Error ("Ningún producto contiene el id recibido.")
            }       
        } catch (error){
            throw Error (`El id recibido no coincide: ${error}`)
        } 
    }

    encryptPassword = async (password) => {
        const encryptedPassword = await bcrypt.hash(password, 10)
        return encryptedPassword

    }

}



export default ProductManager;


