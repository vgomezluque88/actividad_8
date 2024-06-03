//crear y levantar server
const http = require('node:http');

const app = require('./src/app');

require('dotenv').config();

require('./src/config/db')

const server = http.createServer(app);

const PORT = process.env.PORT || 3307;

server.listen(PORT);

server.on('listening', () => {
    console.log(`Servidor en escucha en el puerto ${PORT}`)
})