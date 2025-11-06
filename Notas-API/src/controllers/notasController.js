import { users } from './authController.js';

export const getNotas = (req, res) => {
    const user = users.find(u => u.email === req.session.user);
    if (!user) return res.status(401).send({ message: 'Não autorizado' });
    res.status(200).send({ notas: user.notas });
};

export const addNota = (req, res) => {
    const { nomeAluno, valor } = req.body;

    if (!nomeAluno || valor === undefined || valor < 0 || valor > 10) {
        return res.status(400).send({ message: 'Nota inválida' });
    }

    const user = users.find(u => u.email === req.session.user);
    if (!user) return res.status(401).send({ message: 'Não autorizado' });

    user.notas.push({ nomeAluno, valor });
    res.status(201).send({ message: 'Nota adicionada com sucesso!' });
};

export const mediaAluno = (req, res) => {
    const { nomeAluno } = req.params;
    const user = users.find(u => u.email === req.session.user);
    if (!user) return res.status(401).send({ message: 'Não autorizado' });

    const notasAluno = user.notas.filter(n => n.nomeAluno === nomeAluno);
    if (notasAluno.length === 0) {
        return res.status(404).send({ message: 'Aluno não encontrado' });
    }

    const soma = notasAluno.reduce((acc, n) => acc + n.valor, 0);
    const media = soma / notasAluno.length;

    res.status(200).send({ nomeAluno, media });
};
