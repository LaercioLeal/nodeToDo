const routes = require('express').Router();
const tarefaController = require('../../controllers/tarefa');

routes.post('/tarefa/create', tarefaController.create);
routes.get('/tarefa/read', tarefaController.read);
routes.get('/tarefa/list', tarefaController.list);
routes.put('/tarefa/update', tarefaController.update);
routes.delete('/tarefa/delete', tarefaController.delete);

module.exports = routes;