import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

// GET all links
export async function GET() {
    try {
        const links = await prisma.link.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(links);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar links' }, { status: 500 });
    }
}

// POST a new link
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const data = await request.json();

        // Automatically set order to be last
        const count = await prisma.link.count();
        const newLink = await prisma.link.create({
            data: {
                ...data,
                order: data.order ?? count + 1
            }
        });
        return NextResponse.json(newLink, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar link' }, { status: 500 });
    }
}
