import * as googleapis from 'googleapis';
const { google } = googleapis;

const privateKey = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '';

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  privateKey,
  ['https://www.googleapis.com/auth/calendar']
);

const calendar = google.calendar({ version: 'v3', auth });
const calendarId = process.env.GOOGLE_CALENDAR_ID;

/**
 * Lista eventos para uma determinada data e gera slots livres das 09h às 18h
 * Consideramos reuniões de 30 minutos por padrão.
 */
export async function getAvailableSlots(dateStr) {
    try {
        const startOfDay = new Date(`${dateStr}T09:00:00`);
        const endOfDay = new Date(`${dateStr}T18:00:00`);

        const response = await calendar.events.list({
            calendarId,
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items || [];
        const slots = [];
        
        // Gerar slots de 30 min e filtrar os que colidem com eventos
        let current = new Date(startOfDay);
        while (current < endOfDay) {
            const slotStart = new Date(current);
            const slotEnd = new Date(current.getTime() + 30 * 60000);
            
            const isBusy = events.some(event => {
                const eventStart = new Date(event.start.dateTime || event.start.date);
                const eventEnd = new Date(event.end.dateTime || event.end.date);
                return (slotStart < eventEnd && slotEnd > eventStart);
            });

            if (!isBusy) {
                slots.push({
                    start: slotStart.toISOString(),
                    end: slotEnd.toISOString(),
                    label: slotStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                });
            }
            current = slotEnd;
        }

        return slots;
    } catch (error) {
        console.error('Erro ao buscar slots no Google Calendar:', error);
        throw error;
    }
}

/**
 * Cria um evento na agenda
 */
export async function createMeeting({ summary, startTime, endTime, guestEmail }) {
    try {
        const event = {
            summary: `Reunião com Mary: ${summary}`,
            description: `Agendamento automático via Assistente Virtual Mary.\nConvidado: ${guestEmail}`,
            start: {
                dateTime: startTime,
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: endTime,
                timeZone: 'America/Sao_Paulo',
            },
            attendees: [
                { email: guestEmail }
            ],
            reminders: {
                useDefault: true
            }
        };

        const response = await calendar.events.insert({
            calendarId,
            resource: event,
            sendUpdates: 'all',
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao criar evento no Google Calendar:', error);
        throw error;
    }
}
