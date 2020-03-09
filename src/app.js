const http = require('http');
const express = require('express');

const app = express();

const hostname = 'localhost';
const port = 3000;

app.set('port', port)

app.use((req, res, next) => {
    res.status(404).send();
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log('Server is running...');
});