const request = require('supertest');
const express = require('express');
const authRoutes = require('../src/routes/auth');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock Prisma
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            student: {
                findUnique: jest.fn().mockReturnValue(null), // Simulate new user
                create: jest.fn().mockReturnValue({ id: '123', name: 'Test', email: 'test@test.com', group: 'EXPERIMENTAL' }),
            },
        })),
    };
});

describe('Auth API', () => {
    it('should register a new student', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                name: 'Test Student',
                email: 'test@test.com'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('group');
    });

    it('should fail without email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                name: 'Test Student'
            });

        expect(res.statusCode).toEqual(400);
    });
});
