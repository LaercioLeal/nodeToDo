const Sequelize = require('sequelize');

const sequelizeConnection = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

async function startConnection() {
    try {
        await sequelizeConnection.authenticate();
        await sequelizeConnection.createSchema(process.env.DB_SCHEMA, { ifNotExists: true });
        await sequelizeConnection.sync();
        console.log("Database connection successful");
    }
    catch (err) {
        console.log("Erro while trying to connect database:", err);
    }
}

module.exports = { sequelizeConnection, startConnection };