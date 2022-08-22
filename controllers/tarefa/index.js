const tarefaModel = require('../../model/tarefa/index.js');

module.exports = {

    async create(req, res) {
        const { titulo, descricao } = req.body;

        if (titulo != undefined && titulo != '') {
            tarefaModel.create({
                titulo: titulo,
                descricao: descricao
            }).then(tarefa => {
                if (tarefa != undefined) {
                    res.status(200).json({ message: "Tarefa adicionada com sucesso.", tarefa: tarefa });
                }
                else {
                    res.status(500).json({ message: "Um erro inesperado aconteceu." });
                }
            }).catch(err => {
                res.status(500).json({ message: "Um erro inesperado aconteceu.", error: err });
            });
        }
        else {
            res.status(406).json({ message: "Título inválido ou não preenchido." });
        }
    },

    async read(req, res) {

        const { titulo } = req.body;

        if (titulo != undefined && titulo != '') {
            tarefaModel.findAll({
                where: {
                    titulo: titulo
                }
            }).then(tarefas => {
                if (tarefas.length > 0) {
                    res.status(200).json({ tarefas });
                }
                else {
                    res.status(404).json({ message: "Nenhuma tarefa com o título especificado foi encontrada." });
                }
            }).catch(err => {
                res.status(500).json({ message: "Um erro inesperado aconteceu.", error: err });
            });
        }
        else {
            res.status(406).json({ message: "Nenhum título foi especificado." });
        }
    },

    async list(req, res) {
        tarefaModel.findAll().then(tarefas => {
            if (tarefas.length > 0) {
                res.status(200).json({ tarefas });
            }
            else {
                res.status(404).json({ message: "Nenhuma tarefa encontrada." });
            }
        }).catch(err => {
            res.status(500).json({ message: "Um erro inesperado aconteceu.", error: err });
        });
    },

    async update(req, res) {
        const { id, titulo, descricao } = req.body;

        if (id != undefined) {
            if (titulo != undefined && titulo != '') {
                tarefaModel.update({
                    titulo: titulo,
                    descricao: descricao
                }, {
                    where: {
                        id: id
                    },
                    returning: true
                }).then(tarefa => {
                    if (tarefa[0] == 1) {
                        res.status(200).json({ message: "Tarefa atualizada com sucesso.", tarefa: tarefa[1][0] });
                    }
                    else {
                        res.status(404).json({ message: "Tarefa não encontrada." });
                    }
                }).catch(err => {
                    res.status(500).json({ message: "Um erro inesperado aconteceu.", error: err });
                });
            }
            else {
                res.status(406).json({ message: "Título inválido ou não preenchido." });
            }
        }
        else {
            res.status(406).json({ message: "Tarefa não selecionada. ID inválido." });
        }
    },

    async delete(req, res) {
        const { id } = req.body;

        if (id != undefined) {
            tarefaModel.destroy({
                where: {
                    id: id
                }
            }).then(deleted => {
                if (deleted == 1) {
                    res.status(200).json({ message: "Tarefa apagada com sucesso." });
                }
                else {
                    res.status(404).json({ message: "Tarefa não encontrada." });
                }
            }).catch(err => {
                res.status(500).json({ message: "Um erro inesperado aconteceu.", error: err });
            });
        }
        else {
            res.status(406).json({ message: "Tarefa não selecionada. ID inválido." });
        }
    }

}