// NO FUNCIONA PORQUE NO TIENE EL PACKAJE.JSON

import http from 'http'

const protocolo = http
const PORT = 8080

const server = protocolo.createServer((request, response) => {
    response.end("HOLAAAAAA NOVATO")
})






















server.listen(PORT, () => {
    console.log(`Server escuchando a través del puerto ${PORT}`)
})