/**
 * @jest-environment node
 */
import { GET, POST } from './route';

// Mocka o Prisma e o NextAuth
jest.mock('@/lib/prisma', () => ({
    prisma: {
        link: {
            findMany: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
        }
    }
}));

jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn(),
}));

jest.mock('@/app/api/auth/[...nextauth]/route', () => ({
    authOptions: {},
}));

// Mocka NextResponse
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn((data, init) => ({
            json: async () => data,
            status: init?.status || 200,
        })),
    }
}));

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

describe('API /api/links', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET', () => {
        it('deve retornar todos os links ordenados', async () => {
            const mockLinks = [
                { id: '1', title: 'LinkedIn', order: 1 },
                { id: '2', title: 'GitHub', order: 2 },
            ];
            prisma.link.findMany.mockResolvedValue(mockLinks);

            const response = await GET();
            const data = await response.json();

            expect(prisma.link.findMany).toHaveBeenCalledWith({ orderBy: { order: 'asc' } });
            expect(data).toHaveLength(2);
            expect(data[0].title).toBe('LinkedIn');
        });

        it('deve retornar status 500 em caso de erro', async () => {
            prisma.link.findMany.mockRejectedValue(new Error('DB error'));

            const response = await GET();
            expect(response.status).toBe(500);
        });
    });

    describe('POST', () => {
        it('deve retornar 401 se o usuário não estiver autenticado', async () => {
            getServerSession.mockResolvedValue(null);

            const request = { json: async () => ({ title: 'Novo Link', url: 'https://exemplo.com' }) };
            const response = await POST(request);

            expect(response.status).toBe(401);
        });

        it('deve criar um novo link com sucesso quando autenticado', async () => {
            getServerSession.mockResolvedValue({ user: { email: 'admin@test.com' } });
            prisma.link.count.mockResolvedValue(3);
            prisma.link.create.mockResolvedValue({ id: '4', title: 'Novo Link', url: 'https://exemplo.com', order: 4 });

            const request = { json: async () => ({ title: 'Novo Link', url: 'https://exemplo.com' }) };
            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(201);
            expect(data.title).toBe('Novo Link');
        });
    });
});
