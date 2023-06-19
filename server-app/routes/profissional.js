const express = require('express');
const router = express.Router();
const { Profissional, User } = require('../models');

//Rota para cadastro de um novo profissional
router.post('/create', async (req, res) => {
    try {
        const { nome, descricao, cpf, comissao, userId } = req.body;

        if (!cpf) {
            return res.status(400).send('CPF é obrigatório');
        }

        //Verifica se o cpf já está em uso
        const existingProfissional = await Profissional.findOne({ where: { cpf } });
        if (existingProfissional) {
            return res.status(409).send('Já existe um profissional com este cpf');
        }

        //Verifica se os campos obrigatórios estão preenchidos
        if (!nome || !descricao || !cpf || !comissao || !userId) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos');
        }

        //Encontra o usuário existente com base no userId
        const existingUser = await User.findOne({ where: { id: userId } });
        if (existingUser) {
            //Altera o tipo de acesso do usuário para 2 (profissional)
            existingUser.tipo_acesso = 2;
            await existingUser.save();

            //Verifica se o usuário já está vinculado a um profissional
            const existingProfissional = await Profissional.findOne({ where: { usuario_id: userId } });
            if (existingProfissional) {
                return res.status(409).send('Usuário já está vinculado a um profissional');
            }
        } else {
            return res.status(404).send('Usuário não encontrado');
        }

        //Cria um novo profissional e vincula ao usuário existente
        const newProfissional = await Profissional.create({
            nome,
            descricao,
            cpf,
            comissao,
            usuario_id: userId,
            data_cadastro: new Date()
        });

        res.status(200).send(newProfissional);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para buscar um profissional especifico
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send('O id do profissional é obrigatório.');
        }

        const profissional = await Profissional.findByPk(id);

        if (!profissional) {
            return res.status(404).send('Profissional não encontrado.');
        }

        res.status(200).send(profissional);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para buscar todos os profissionais
router.get('/', async (req, res) => {
    try {
        const profissionais = await Profissional.findAll();

        if (!profissionais) {
            return res.status(404).send('Nenhum profissional encontrado.');
        } else {
            res.status(200).send(profissionais);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para atualizar um profissional
router.put('/:id', async (req, res) => {
    try {
        const { nome, descricao, cpf, comissao, userId } = req.body;
        const { id } = req.params;

        //Verifica se o profissional existe
        const profissional = await Profissional.findByPk(id);
        if (!profissional) {
            return res.status(404).send('Profissional não encontrado.');
        }

        //Verifica se o cpf já está em uso
        const existingProfissional = await Profissional.findOne({ where: { cpf } });
        if (existingProfissional && existingProfissional.id != id) {
            return res.status(409).send('Já existe um profissional com este cpf.');
        }

        //Verifica se os campos obrigatórios estão preenchidos
        if (comissao && comissao == 0) {

        } else {
            if (!nome || !descricao || !cpf || !comissao || !userId) {
                return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
            }
        }

        //Atualiza os dados do profissional
        profissional.nome = nome;
        profissional.descricao = descricao;
        profissional.cpf = cpf;
        profissional.comissao = comissao;
        profissional.usuario_id = userId;
        await profissional.save();

        res.status(200).send(profissional);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para deletar um profissional
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        //Verifica se o profissional existe
        const profissional = await Profissional.findByPk(id);
        if (!profissional) {
            return res.status(404).send('Profissional não encontrado.');
        }

        //Verifica se o profissional possui algum agendamento
        // const agendamentos = await profissional.getAgendamentos();
        // if (agendamentos.length > 0) {
        //     return res.status(400).send('Não é possível excluir um profissional que possui agendamentos.');
        // }

        //Excluo o profissional
        await profissional.destroy();

        //Verifica se o usuário existe
        const user = await User.findByPk(profissional.usuario_id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        //Altera o tipo de acesso do usuário para 2 (usuario padrão)
        user.tipo_acesso = 2;
        await user.save();

        res.status(200).send('Profissional excluído com sucesso.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;