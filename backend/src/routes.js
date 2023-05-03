const express = require('express');
const connection = require('./database/connections');
const routes = express.Router();


routes.get('/usuarios', async (req, res) => {
    const usuarios = await connection('usuarios').select('*');
    return res.json(usuarios);
})

routes.delete('/usuarios', async (req, res) => {
    const { nome } = req.body;
    await connection('usuarios').where({ nome }).del();
    return res.json({ message: 'Usuário excluído com sucesso!' });
  });
  
routes.get('/login', async (req, res) => {
    const { email, senha } = req.query;

    const usuario = await connection('usuarios').select('*').where({ email, senha }).first();

    if (usuario) {
        return res.json({ success: true, usuario , message: 'Credenciais válidas'});
    } else {
        return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

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

routes.get('/disciplinas', async (req, res) => {
    const usuarios = await connection('disciplinas').select('*').where('tipo','like','Ob');
    return res.json(usuarios);
});
    

module.exports = routes;