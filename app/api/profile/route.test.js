/**
 * @jest-environment node
 */
import { GET, PUT } from './route';
import { NextResponse } from 'next/server';

// Mocka o módulo Prisma para isolar o teste do banco real
jest.mock('@/lib/prisma', () => ({
    prisma: {
        profile: {
            findFirst: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
        }
    }
}));

// Mocka NextResponse para testes no ambiente Node
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn((data, init) => ({
            json: async () => data,
            status: init?.status || 200,
        })),
    }
}));

import { prisma } from '@/lib/prisma';

describe('API /api/profile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET', () => {
        it('deve retornar o perfil do banco de dados', async () => {
            const mockProfile = { id: '1', name: 'Filipe Machado', bio: 'Especialista em IR' };
            prisma.profile.findFirst.mockResolvedValue(mockProfile);

            const response = await GET();
            const data = await response.json();

            expect(prisma.profile.findFirst).toHaveBeenCalledTimes(1);
            expect(data).toEqual(mockProfile);
        });

        it('deve retornar objeto vazio se não houver perfil', async () => {
            prisma.profile.findFirst.mockResolvedValue(null);

            const response = await GET();
            const data = await response.json();

            expect(data).toEqual({});
        });

        it('deve retornar status 500 em caso de erro', async () => {
            prisma.profile.findFirst.mockRejectedValue(new Error('DB error'));

            const response = await GET();

            expect(response.status).toBe(500);
        });
    });

    describe('PUT', () => {
        it('deve atualizar o perfil existente', async () => {
            const existingProfile = { id: '1', name: 'Filipe' };
            const updatedProfile = { id: '1', name: 'Filipe Machado' };
            prisma.profile.findFirst.mockResolvedValue(existingProfile);
            prisma.profile.update.mockResolvedValue(updatedProfile);

            const request = { json: async () => ({ name: 'Filipe Machado' }) };
            const response = await PUT(request);
            const data = await response.json();

            expect(prisma.profile.update).toHaveBeenCalledTimes(1);
            expect(data.name).toBe('Filipe Machado');
        });

        it('deve criar um novo perfil se não existir', async () => {
            prisma.profile.findFirst.mockResolvedValue(null);
            prisma.profile.create.mockResolvedValue({ id: '2', name: 'Filipe Novo' });

            const request = { json: async () => ({ name: 'Filipe Novo' }) };
            const response = await PUT(request);
            const data = await response.json();

            expect(prisma.profile.create).toHaveBeenCalledTimes(1);
            expect(data.name).toBe('Filipe Novo');
        });
    });
});
