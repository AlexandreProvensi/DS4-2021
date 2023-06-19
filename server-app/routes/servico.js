const express = require('express');
const router = express.Router();
const { Servico } = require('../models');

//Rota para cadastro de um novo serviço
router.post('/create', async (req, res) => {
    try {
        const { nome, descricao, duracao, preco } = req.body;

        //Verifica se o nome do serviço já está em uso
        const existingServico = await Servico.findOne({ where: { nome } });
        if (existingServico) {
            return res.status(409).send('Já existe um serviço com este nome.');
        }

        //Verifica se os campos obrigatórios estão preenchidos
        if (!nome || !descricao || !nome || !preco) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
        }

        //Cria um novo serviço
        const newServico = await Servico.create({
            nome,
            descricao,
            duracao,
            preco
        });

        res.status(200).send(newServico);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para buscar um serviço especifico
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const servico = await Servico.findByPk(id);

        if (!servico) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.status(200).send(servico);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para buscar todos os serviços
router.get('/', async (req, res) => {
    try {
        const servicos = await Servico.findAll();
        if (!servicos) {
            return res.status(404).send('Nenhum serviço encontrado.');
        }

        res.status(200).send(servicos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para atualizar um serviço
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, duracao, preco } = req.body;

        const servico = await Servico.findByPk(id);

        if (!servico) {
            return res.status(404).send('Serviço não encontrado.');
        }

        //Verifica se o nome do serviço já está em uso
        const existingServico = await Servico.findOne({ where: { nome } });
        if (existingServico) {
            return res.status(409).send('Já existe um serviço com este nome.');
        }

        //Verifica se os campos obrigatórios estão preenchidos
        if (!nome || !descricao || !nome || !preco) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
        }

        await servico.update({
            nome,
            descricao,
            duracao,
            preco
        });

        res.status(200).send(servico);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;