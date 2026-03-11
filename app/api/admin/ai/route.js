import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// Inicialização de configuração padrão caso não exista
const DEFAULT_AI_CONFIG = {
    assistantName: 'Mary',
    isActive: true,
    systemPrompt: `Você é a Assistente Virtual Oficial do portfólio de Filipe Machado. 
Sua função primária é agir como facilitadora para recrutadores.
Responda de forma profissional e amigável, em no máximo 1 ou 2 parágrafos.
Se perguntarem algo não relacionado ao Filipe, recuse educadamente.`,
    skills: 'Análise de Dados, Automação (n8n), Mercado Financeiro, Investor Relations',
};

async function getOrCreateAIConfig() {
    let config = await prisma.aIConfig.findFirst();
    if (!config) {
        config = await prisma.aIConfig.create({
            data: DEFAULT_AI_CONFIG
        });
    }
    return config;
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions).catch(() => null);
        // GET returns config even without auth (for frontend to consume)
        
        const config = await getOrCreateAIConfig();
        return NextResponse.json(config);
    } catch (error) {
        console.error('Erro ao buscar configs da IA:', error);
        return NextResponse.json({ error: 'Erro ao buscar configs da IA' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions).catch(() => null);
        if (!session) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const data = await req.json();
        
        const config = await getOrCreateAIConfig();
        
        const updatedConfig = await prisma.aIConfig.update({
            where: { id: config.id },
            data: {
                assistantName: data.assistantName,
                isActive: data.isActive,
                systemPrompt: data.systemPrompt,
                skills: data.skills
            }
        });

        return NextResponse.json(updatedConfig);
    } catch (error) {
        console.error('Erro ao atualizar configs da IA:', error);
        return NextResponse.json({ error: 'Erro ao atualizar configs da IA' }, { status: 500 });
    }
}
