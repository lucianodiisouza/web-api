const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'development'

const config = require('../config/config')[environment];

const Sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.datavase.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
);