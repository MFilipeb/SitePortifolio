import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// PUT update a single link (by ID in URL /api/links/[id])
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const data = await request.json();

        const updatedLink = await prisma.link.update({
            where: { id },
            data
        });
        return NextResponse.json(updatedLink);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar link' }, { status: 500 });
    }
}

// DELETE a link
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await prisma.link.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar link' }, { status: 500 });
    }
}
