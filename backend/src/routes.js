const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connections');

const routes = express.Router();

routes.get('/usuarios', async(req, res) => {
    const usuarios = await connection('usuarios').select('*');
    return res.json(usuarios);
})

routes.post('/usuarios', async (req, res) => {
    const {nome, matricula, email, curso, senha} = req.body;

    await connection('usuarios').insert({
        nome,
        matricula,
        email,
        curso,
        senha
    });
    return res.json('Usuario criado com sucesso!');
});

module.exports = routes;