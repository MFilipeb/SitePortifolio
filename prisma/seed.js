const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial Linktree data...');

    // Reset database (optional, helps during dev)
    await prisma.link.deleteMany();
    await prisma.profile.deleteMany();

    // Create Profile
    const profile = await prisma.profile.create({
        data: {
            name: 'Filipe Machado',
            bio: 'Especialista em Investor Relations\ne Wealth Management. Otimizo\nrentabilidade de portfólios\nunindo rigor financeiro,\nBig Data e Automação.',
            whatsappNumber: '5521975423002',
            linkedinUrl: 'https://linkedin.com/in/filipemachadobulhoesalves',
            githubUrl: 'https://github.com/filipemachadobulhoes',
            cvUrl: '/curriculo.pdf.pdf',
            avatarUrl: '/perfil.jpg.jpg',
            bgImageUrl: '/perfil.jpg.jpg'
        }
    });

    // Create Default Links
    await prisma.link.createMany({
        data: [
            {
                title: 'Currículo (CV)',
                url: '/curriculo.pdf.pdf',
                iconType: 'document',
                isActive: true,
                order: 1
            },
            {
                title: 'Visit my profile on LinkedIn',
                url: 'https://linkedin.com/in/filipemachadobulhoesalves',
                iconType: 'linkedin',
                isActive: true,
                order: 2
            },
            {
                title: 'WhatsApp',
                url: 'https://wa.me/5521975423002',
                iconType: 'whatsapp',
                isActive: true,
                order: 3
            },
            {
                title: 'Meus Projetos (Tech & Dados)',
                url: 'https://github.com/filipemachadobulhoes',
                iconType: 'github',
                isActive: true,
                order: 4
            },
            {
                title: 'Case: Redução de CMC/CAC (n8n)',
                url: '#cases',
                iconType: 'lightning',
                isActive: true,
                order: 5
            }
        ]
    });

    console.log('Database seeded successfully with Linktree profile and links!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
