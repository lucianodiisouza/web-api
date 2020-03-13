const http = require('http');
const express = require('express');
const status = require('http-status');
const usuariosRoute = require('./routes/usuarios')
// const spoilersRoute = require('./routes/spoilers');
const sequelize = require('./database/database');

const app = express();

app.use(express.json());

// app.use('/api', spoilersRoute);
app.use('/api', usuariosRoute);

app.use((req, res, next) => {
    res.status(status.NOT_FOUND).send();
});

app.use((error, req, res, next) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
});


// if force: true everytime that you start your node application, api will drop all tables and his respective data and create the tables again
sequelize.sync({ force: false }).then(() => {
    const port = process.env.PORT || 3000;

    app.set("post", port);

    const server = http.createServer(app);

    server.listen(port);
});