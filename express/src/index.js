import express from "express"

const app = express()
const PORT = 8080

//middleware para capturar datos complejos desde la url ---> req.query
app.use(express.urlencoded({extended:true}))

// Ejemplo de req.query
app.get("/ejemploQueries/query", (req, res) => {
    const consultas = []
    let {nombre, apellido, edad} = req.query
    consultas.push(req.query)
    res.send(consultas)
})


// EJEMPLO DE ENVÍO DE INFO JSON
// app.get('/saludo', (req, res) => {
//     res.send({ nombre: "juan" })
// })

app.get('/saludo', (req, res) => {
    res.send("Holaaa novato ")
})

app.get('/bienvenida', (req, res) => {
    res.send({
        nombre: "juan",
        edad: 15
    })
})

app.get("/usuario/:nombre/:apellido", (req, res) => {
    console.log(req.params)
    res.send(`Tu nombre completo es: ${req.params.nombre} ${req.params.apellido}`)
})

const usuarios = [
    { id: "1", nombre: "Carlos", apellido: "Esteban", edad: "15"},
    { id: "2", nombre: "Pincho", apellido: "Sate", edad: "21"},
    { id: "3", nombre: "Carcha", apellido: "Do", edad: "52"}
]

app.get("/", (req, res) => {
    res.send(usuarios)
})

app.get("/:userId", (req, res) => {
    const usuario = usuarios.find(u => u.id === req.params.userId)
    if(usuario) {
        res.send(usuario)
    }
    res.send({ message: "Usuario no encontrado!"})

})




















app.listen(PORT, () => {
    console.log(`Server escuchando a través del puerto ${PORT}`)
})