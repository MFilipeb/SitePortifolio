import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

// PUT update a single link (by ID in URL /api/links/[id])
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const { id } = await params;
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
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.link.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar link' }, { status: 500 });
    }
}
