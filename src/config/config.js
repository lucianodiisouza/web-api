module.exports = {
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'spoiler',
            dialect: 'mysql',
            user: 'luciano',
            password: 'aggjlr@123'
        }
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        }
    }
};