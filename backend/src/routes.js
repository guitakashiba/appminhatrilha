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
    const usuarios = await connection('disciplinas').select('*');
    return res.json(usuarios);
});

routes.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { disciplinas } = req.body;

    console.log(req.body)

    try {
        // Primeiro, remove todas as disciplinas atuais do usuário
        await connection('usuarioDisciplinas').where({ userId: id }).delete();

        // Em seguida, insere as novas disciplinas
        const usuarioDisciplinas = disciplinas.map(({ usuarioId, disciplinaId }) => {
            return {
                userId: usuarioId,
                disciplinaId
            };
        });

        await connection('usuarioDisciplinas').insert(usuarioDisciplinas);

        return res.json({ message: 'Disciplinas atualizadas com sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar disciplinas' });
    }
});

// Rota de logout
routes.get('/logout', (req, res) => {
    req.session.destroy(); // ou invalidar token, dependendo do método de autenticação
    res.send({ msg: "Usuário deslogado com sucesso" });
  });
/* 
routes.get('/usuarios/:id/disciplinas', async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioDisciplinas = await connection('usuarioDisciplinas')
            .where('userId', id)
            .select('*');
        return res.json(usuarioDisciplinas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});
*/
routes.get('/usuarios/:id/disciplinas', async (req, res) => {
    const { id } = req.params;
    
    try {
        // Selecione todas as disciplinas para este usuário
        const usuarioDisciplinas = await connection('usuarioDisciplinas')
            .where('userId', id)
            .select('*');
        
        const disciplinas = [];

        // Para cada disciplina do usuário, recupera os detalhes da disciplina
        for (let ud of usuarioDisciplinas) {
            const disciplina = await connection('disciplinas')
                .where('id', ud.disciplinaId)
                .first();
            
            if (disciplina) {
                disciplinas.push(disciplina);
            }
        }

        return res.json(disciplinas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao obter disciplinas' });
    }
});

  

module.exports = routes;