import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            include: {
                company: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, description, salary, location, companyId } = body;

        if (!title || !description || !companyId) {
            return NextResponse.json(
                { error: 'Title, description, and companyId are required.' },
                { status: 400 }
            );
        }

        const job = await prisma.job.create({
            data: {
                title,
                description,
                salary,
                location,
                companyId,
            },
        });

        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}
