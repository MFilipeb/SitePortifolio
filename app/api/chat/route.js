import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAvailableSlots, createMeeting } from '../../../lib/calendar';

// O SDK é inicializado dentro do handler POST para garantir que as variáveis de ambiente sejam frescas.

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Formato de mensagens inválido' }, { status: 400 });
        }

        // Buscar configurações da IA do banco de dados (Mary)
        let aiConfig = await prisma.aIConfig.findFirst();
        
        let systemInstruction = "Você é a Assistente Virtual Oficial do portfólio de Filipe Machado.";
        
        if (aiConfig) {
            systemInstruction = aiConfig.systemPrompt;
            if (aiConfig.skills) {
                systemInstruction += `\n\n**Conhecimentos Mapeados (Skills):** ${aiConfig.skills}`;
            }
        }

        // Formata as mensagens para a API do Gemini
        // Para a API 'genai', passamos o System Instruction nas configurações do modelo
        // E o histórico de mensagens numa array { role, parts: [{text}] }
        
        const now = new Date();
        const formattedNow = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        
        systemInstruction += `\n\n**CONTEXTO TEMPORAL:**
Data/Hora Atual: ${formattedNow}
Dias de atendimento: Segunda a Sexta, das 09h às 18h.
Regra: Se o usuário pedir para marcar reunião, use a ferramenta 'get_available_slots' para ver o que está livre antes de confirmar.`;

        // Formata o histórico para o chat
        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const lastMessage = messages[messages.length - 1].content;

        const { GoogleGenAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: systemInstruction,
            tools: [{
                functionDeclarations: [
                    {
                        name: 'get_available_slots',
                        description: 'Verifica horários disponíveis na agenda do Filipe para uma data específica.',
                        parameters: {
                            type: 'OBJECT',
                            properties: {
                                date: { type: 'STRING', description: 'A data para verificar (Formato: YYYY-MM-DD)' }
                            },
                            required: ['date']
                        }
                    },
                    {
                        name: 'schedule_meeting',
                        description: 'Agenda oficialmente uma reunião na agenda do Google do Filipe.',
                        parameters: {
                            type: 'OBJECT',
                            properties: {
                                summary: { type: 'STRING', description: 'Assunto da reunião' },
                                startTime: { type: 'STRING', description: 'Início formatado ISO 8601 (ex: 2024-03-22T10:00:00Z)' },
                                endTime: { type: 'STRING', description: 'Término formatado ISO 8601' },
                                guestEmail: { type: 'STRING', description: 'E-mail do interessado/visitante' }
                            },
                            required: ['summary', 'startTime', 'endTime', 'guestEmail']
                        }
                    }
                ]
            }]
        });

        const chat = model.startChat({
            history: history,
        });

        let result = await chat.sendMessage(lastMessage);
        let response = result.response;

        // Loop para lidar com Function Callings
        let loopCount = 0;
        while (response.candidates?.[0]?.content?.parts?.some(p => p.functionCall) && loopCount < 5) {
            const parts = response.candidates[0].content.parts;
            const toolResponses = [];

            for (const part of parts) {
                if (part.functionCall) {
                    const { name, args } = part.functionCall;
                    console.log(`[Mary Executando Tool] ${name}`, args);

                    let functionResponse;
                    if (name === 'get_available_slots') {
                        const slots = await getAvailableSlots(args.date);
                        functionResponse = { slots };
                    } else if (name === 'schedule_meeting') {
                        const meeting = await createMeeting(args);
                        functionResponse = { status: 'confirmed', event: meeting.htmlLink };
                    }

                    toolResponses.push({
                        functionResponse: {
                            name,
                            response: functionResponse
                        }
                    });
                }
            }

            result = await chat.sendMessage(toolResponses);
            response = result.response;
            loopCount++;
        }

        // Extrair o texto da resposta
        let reply = '';
        try {
            reply = typeof response.text === 'function' ? response.text() : response.text;
        } catch (e) {
            console.warn('Erro ao chamar response.text():', e);
            reply = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('CRITICAL ERROR IN API CHAT:', error);
        return NextResponse.json({ 
            error: 'Falha ao processar a requisição com o Gemini',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
