const tarefa = require('./tarefa');

module.exports = function setRoutes(app) {
    app.use(tarefa);
}