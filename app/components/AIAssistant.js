'use client';
import { useState, useRef, useEffect } from 'react';
import './ai-assistant.css';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const res = await fetch('/api/admin/ai');
                const data = await res.json();
                if (data && !data.error) {
                    setConfig(data);
                    setMessages([{ 
                        role: 'model', 
                        content: `Olá! Sou a assistente virtual ${data.assistantName}. Pode me perguntar sobre as experiências profissionais do Filipe.` 
                    }]);
                }
            } catch (err) {
                console.error("Erro ao carregar IA:", err);
            }
        };
        loadConfig();
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // If AI is disabled in admin or not loaded yet
    if (!config || !config.isActive) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        const newMessages = [...messages, { role: 'user', content: userMsg }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await res.json();
            
            if (data.error) {
                setMessages(prev => [...prev, { role: 'model', content: 'Desculpe, ocorreu um erro ao me comunicar com o servidor. Tente novamente.' }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: data.reply }]);
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', content: 'Erro de conexão.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`ai-assistant-wrapper ${isOpen ? 'open' : ''}`}>
            
            {!isOpen && (
                <button 
                    className="ai-fab-button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir chat da IA"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span className="ai-tooltip">Pergunte à IA</span>
                </button>
            )}

            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-header">
                        <div className="ai-header-info">
                            <div className="ai-avatar">{config.assistantName.charAt(0)}</div>
                            <div>
                                <h4>Assistente {config.assistantName}</h4>
                                <span className="ai-status">Online (Gemini)</span>
                            </div>
                        </div>
                        <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div className="ai-messages-list">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`ai-message ${msg.role}`}>
                                <div className="ai-bubble">
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="ai-message model">
                                <div className="ai-bubble loading-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="ai-input-area" onSubmit={handleSend}>
                        <input 
                            type="text" 
                            placeholder="Pergunte sobre minha experiência..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
