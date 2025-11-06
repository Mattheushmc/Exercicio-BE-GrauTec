import request from 'supertest';
import app from '../server.js';

describe('Testes da Autenticação', () => {
    test('Deve cadastrar um novo usuário (201)', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ email: 'teste@teste.com', senha: '1234' });
        expect(res.statusCode).toBe(201);
    });

    test('Não deve permitir cadastrar com email duplicado (400)', async () => {
        await request(app).post('/auth/register').send({ email: 'teste@teste.com', senha: '1234' });
        const res = await request(app).post('/auth/register').send({ email: 'teste@teste.com', senha: '1234' });
        expect(res.statusCode).toBe(400);
    });

    test('Deve permitir logar corretamente (200)', async () => {
        const res = await request(app).post('/auth/login').send({ email: 'teste@teste.com', senha: '1234' });
        expect(res.statusCode).toBe(200);
    });
});
