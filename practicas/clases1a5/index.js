import http from 'http';

const port = 8081;

const server = http.createServer((request, response) => {
    response.end("mi primer hola mundo backend. ")
});


// por defecto localhost o 127.0.0.1
server.listen(port, () => {
    console.log(`lListening on port ${port}`)
});