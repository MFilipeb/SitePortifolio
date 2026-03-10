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
            cvUrl: '/curriculo.pdf',
            avatarUrl: null,
            bgImageUrl: '/tech-bg.jpg'
        }
    });

    // Create Default Links
    await prisma.link.createMany({
        data: [
            {
                title: 'Currículo (CV)',
                url: '/curriculo.pdf',
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

    // Create Projects
    await prisma.project.deleteMany(); // Reset
    await prisma.project.createMany({
        data: [
            {
                title: 'Price Wise',
                description: 'Comparador de preços inteligente com IA.',
                technologies: 'JavaScript, Vanilla CSS, Gemini AI, Web Scraping',
                howItWasDone: 'Desenvolvido como uma aplicação web dinâmica que utiliza a API do Gemini para processar buscas de produtos em tempo real. Implementa um sistema de alertas de preço e filtros avançados com uma interface premium em Glassmorphism.',
                achievements: 'Integração de IA generativa para busca semântica, sistema de filtros reativos e design responsivo com micro-animações.',
                imageUrl: '/pricewise-preview.jpg',
                linkUrl: '#',
                order: 1
            },
            {
                title: 'Site Portifolio',
                description: 'Plataforma de gestão de links e portfólio profissional.',
                technologies: 'Next.js 15, React 19, Prisma, PostgreSQL, NextAuth',
                howItWasDone: 'Construído como uma aplicação Full Stack moderna. Utiliza Server Components para performance e NextAuth para um painel administrativo seguro. O banco de dados PostgreSQL (Neon) garante escalabilidade e persistência.',
                achievements: 'Painel administrativo customizado, sistema de autenticação segura, integração com banco de dados em tempo real e deploy automatizado na Vercel.',
                imageUrl: '/portfolio-preview.jpg',
                linkUrl: '#',
                order: 2
            }
        ]
    });

    console.log('Database seeded successfully with projects, profile and links!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
