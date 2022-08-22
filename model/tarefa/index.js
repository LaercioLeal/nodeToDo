const Sequelize = require('sequelize');
const database = require('../../database').sequelizeConnection;

const tarefas = database.define('Tarefa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
    }
}, {
    schema: process.env.DB_SCHEMA
});

module.exports = tarefas;