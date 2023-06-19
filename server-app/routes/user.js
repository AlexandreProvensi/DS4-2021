const express = require('express');
const router = express.Router();
const { User } = require('../models')

//Rota para cadastro de um novo usuario
router.post('/signup', async (req, res) => {
    try {
        const { email, senha, nome, telefone } = req.body;

        //Verifica se o email já está em uso
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).send('Já existe um usuário com este e-mail');
        }

        //Verifica se os campos obrigatórios estão preenchidos
        if (!email || !senha || !nome || !telefone) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos');
        }

        //Cria um novo usuário
        const newUser = await User.create({
            email,
            senha,
            nome,
            telefone,
            tipo_acesso: 2, // Valor padrão para novo usuário
            data_cadastro: new Date() // Valor padrão para data de cadastro
        });

        res.status(200).send(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para buscar um usuario especifico
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para buscar todos os usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await User.findAll();
        if (!usuarios) {
            return res.status(404).send('Nenhum usuário encontrado.');
        }
        
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Rota para atualizar um usuario
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, senha, nome, telefone } = req.body;

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        //Verifica se o email já está em uso
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id != id) {
            return res.status(409).send('Já existe um usuário com este e-mail');
        }

        //Verifica se os campos obrigatórios estão preenchidos
        if (!email || !senha || !nome || !telefone) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos');
        }

        await usuario.update({
            email,
            senha,
            nome,
            telefone
        });

        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;