const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Usuario = sequelize.define('usuarios', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    telefone: {
      allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [1, 20]
        }
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
        validate: {
            len: [ 2, 255]
        }
    },
    senha: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    rua: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    numero: { 
        allowNull: false,
        type: Sequelize.INTEGER(10),
        validate: {
            len: [1, 10]
        }
    },
    bairro: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    cidade: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    estado: { 
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },
    complemento: { 
        allowNull: true,
        type: Sequelize.STRING(255),
        validate: {
            len: [2, 255]
        }
    },

});

module.exports = Usuario;