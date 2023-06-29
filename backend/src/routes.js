const express = require('express');
const connection = require('./database/connections');
const routes = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


const session = require('express-session');

routes.use(session({
  secret: 'seu segredo',
  resave: false,
  saveUninitialized: false
}));

routes.get('/usuarios', async (req, res) => {
    const usuarios = await connection('usuarios').select('*');
    return res.json(usuarios);
})

routes.delete('/usuarios', async (req, res) => {
    const { nome } = req.body;
    await connection('usuarios').where({ nome }).del();
    return res.json({ message: 'Usuário excluído com sucesso!' });
  });

// compare a senha fornecida com a senha criptografada
routes.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar o usuário pelo email.
        const usuario = await connection('usuarios').select('*').where({ email }).first();

        // Se o usuário não existir ou a senha estiver incorreta, retornar um erro.
        if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }

        // Se o login for bem-sucedido, salvar o usuário na sessão e retornar os detalhes do usuário.
        req.session.usuario = usuario;
        return res.json({ success: true, usuario, message: 'Credenciais válidas.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro ao fazer login.' });
    }
});


routes.post('/usuarios', async (req, res) => {
    const {nome, matricula, email, curso, senha} = req.body;

    try {
        // Verificar se o e-mail ou a matrícula já existem no banco de dados.
        const existingUser = await connection('usuarios').select('*').where({ email }).orWhere({ matricula }).first();
        
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'E-mail ou matrícula já estão em uso.' });
        }

        // Criptografar a senha antes de inserir no banco de dados.
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        await connection('usuarios').insert({
            nome,
            matricula,
            email,
            curso,
            senha: hashedPassword
        });

        return res.json({ success: true, message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro ao registrar o usuário.' });
    }
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
routes.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Erro ao fazer logout.' });
        } else {
            return res.json({ success: true, message: 'Usuário deslogado com sucesso.' });
        }
    });
});

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