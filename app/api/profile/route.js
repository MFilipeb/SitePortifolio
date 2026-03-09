import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// GET: Fetch the unique profile
export async function GET() {
    try {
        const profile = await prisma.profile.findFirst();
        return NextResponse.json(profile || {});
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar perfil' }, { status: 500 });
    }
}

// PUT: Update the unique profile (create if it doesn't exist)
export async function PUT(request) {
    try {
        const data = await request.json();

        // We only ever have one profile, so we find the first one
        let profile = await prisma.profile.findFirst();

        if (profile) {
            // Update existing
            profile = await prisma.profile.update({
                where: { id: profile.id },
                data
            });
        } else {
            // Create new if somehow deleted
            profile = await prisma.profile.create({ data });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erro ao atualizar perfil' }, { status: 500 });
    }
}
