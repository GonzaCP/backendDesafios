import fs from 'fs'



class CartManager {
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

    // addCart = async({}) => {
    //     let newCart = []
    //     try {
    //         let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")          
    //         let readCartParse = JSON.parse(readCart)
    //         newCart.id = readCartParse[readCartParse.length - 1].id  + 1
    //         readCartParse.push(newCart)
    //         await fs.promises.writeFile(this.fileName, JSON.stringify(readCartParse, null, 2))
    //     } catch {
        
    //     }
        
    //     }






}



export default CartManager