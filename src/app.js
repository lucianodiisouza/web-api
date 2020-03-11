const http = require('http');
const express = require('express');
const spoilersRoute = require('./routes/spoilers');
const sequelize = require('./database/database');

const app = express();

app.use(express.json());

app.use('/api', spoilersRoute)

app.use((req, res, next) => {
    res.status(404).send();
});

app.use((error, req, res, next) => {
    res.status(500).json({ error });
});


// if force: true everytime that you start your node application, api will drop all tables and his respective data and create the tables again
sequelize.sync({ force: true }).then(() => {
    const port = process.env.PORT || 3000;

    app.set("post", port);

    const server = http.createServer(app);

    server.listen(port);
});