import request from 'supertest';
import app from '../server.js';

describe('Testes das Notas', () => {
    const agent = request.agent(app);

    beforeAll(async () => {
        await agent.post('/auth/register').send({ email: 'teste@teste.com', senha: '1234' });
        await agent.post('/auth/login').send({ email: 'teste@teste.com', senha: '1234' });
    });

    test('Não permitir acessar rotas sem sessão (401)', async () => {
        const res = await request(app).get('/notas'); 
        expect(res.statusCode).toBe(401);
    });

    test('Adicionar nota válida (201)', async () => {
        const res = await agent.post('/notas').send({ nomeAluno: 'João', valor: 8 });
        expect(res.statusCode).toBe(201);
    });

    test('Não permitir nota inválida (valor negativo) (400)', async () => {
        const res = await agent.post('/notas').send({ nomeAluno: 'João', valor: -1 });
        expect(res.statusCode).toBe(400);
    });

    test('Não permitir nota inválida (valor maior que 10) (400)', async () => {
        const res = await agent.post('/notas').send({ nomeAluno: 'João', valor: 11 });
        expect(res.statusCode).toBe(400);
    });

    test('Não permitir nota inválida (nomeAluno ausente) (400)', async () => {
        const res = await agent.post('/notas').send({ valor: 5 });
        expect(res.statusCode).toBe(400);
    });

    test('Listar notas (200)', async () => {
        await agent.post('/notas').send({ nomeAluno: 'Maria', valor: 7 });
        const res = await agent.get('/notas');
        expect(res.statusCode).toBe(200);
        expect(res.body.notas.length).toBeGreaterThan(0);
    });

    test('Retornar média correta para um aluno (200)', async () => {
        await agent.post('/notas').send({ nomeAluno: 'Ana', valor: 6 });
        await agent.post('/notas').send({ nomeAluno: 'Ana', valor: 8 });
        const res = await agent.get('/notas/Ana/media');
        expect(res.statusCode).toBe(200);
        expect(res.body.media).toBe(7);
    });

    test('Retornar 404 para aluno não encontrado', async () => {
        const res = await agent.get('/notas/AlunoInexistente/media');
        expect(res.statusCode).toBe(404);
    });
});
