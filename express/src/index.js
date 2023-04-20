import express from "express"

const app = express()
const PORT = 9090

//middleware para capturar datos complejos desde la url ---> req.query
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Ejemplo de req.query
app.get("/ejemploQueries/query", (req, res) => {
    const consultas = []
    let {nombre, apellido, edad} = req.query
    consultas.push(req.query)
    res.send(consultas)
})


app.get("/usuario/:nombre/:apellido", (req, res) => {
    console.log(req.params)
    res.send(`Tu nombre completo es: ${req.params.nombre} ${req.params.apellido}`)
})









//                  EJEMPLO USO DE POSTMAN

let users = []

app.get("/api/users", (req, res) => {  
    res.send(users)
})



app.post('/api/users', (req, res) => {
    let user = req.body    

    // asignacion de ID
    const numRamdom = Math.floor(Math.random() * 20 + 1)
    user.id = numRamdom + users.length


    if (!user.first_name || !user.last_name) {
        return res.status(400).send({ status: "error", msg: "valores incompletos, revisar datos de entrada!!" })
    }
    users.push(user)
    res.send({ status: "success", msg: 'Usuario Creado!' })
})


// en POSTMAN hay que pasarle todo el objeto completo (ioncluido el id) y el id también escribirlo en la url de postman ---> :userId
app.put('/api/users/:userId', (req, res) => {
    let userId = parseInt(req.params.userId)
    let userUpdated = req.body

    const userPosition = users.findIndex((u => u.id === userId))
    if (userPosition < 0) {
        return res.status(202).send({ status: "info", error: "Usuario no encontrado" })
    }
    users[userPosition] = userUpdated



    res.send({ status: "success", msg: 'Usuario modificado!', data: users[userPosition] })
})


// solo hay que escribir el id que queremos eliminar en la url de postman ---> :userId
app.delete('/api/users/:userId', (req, res) => {
    let userId = parseInt(req.params.userId)

    const usersSize = users.length

    const userPosition = users.findIndex((u => u.id === userId))
    if (userPosition < 0) {
        return res.status(202).send({ status: "Error", error: "Usuario no encontrado" })
    }

    users.splice(userPosition, 1)
    if (users.length === usersSize) {
        return res.status(500).send({ status: "error", error: "Usuario no se puede borrar." })
    }

    res.send({ status: "Success", msg: "Usuario ELIMINADO."})

})














app.listen(PORT, () => {
    console.log(`Server escuchando a través del puerto ${PORT}`)
})