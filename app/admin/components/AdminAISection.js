'use client';
import { useState, useEffect } from 'react';
import './AdminAISection.css'; // Add CSS for this component if needed

export default function AdminAISection() {
    const [config, setConfig] = useState({
        assistantName: 'Mary',
        isActive: true,
        systemPrompt: '',
        skills: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch('/api/admin/ai');
            const data = await res.json();
            if (data && !data.error) {
                setConfig({
                    assistantName: data.assistantName || 'Mary',
                    isActive: data.isActive ?? true,
                    systemPrompt: data.systemPrompt || '',
                    skills: data.skills || ''
                });
            }
        } catch (error) {
            console.error('Erro ao buscar configuração', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/admin/ai', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });

            if (res.ok) {
                setMessage('Configurações da IA salvas com sucesso!');
            } else {
                setMessage('Erro ao salvar as configurações.');
            }
        } catch (error) {
            setMessage('Erro de conexão ao salvar.');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (loading) return <div className="admin-loading">Carregando IA...</div>;

    return (
        <div className="admin-ai-section">
            <div className="admin-header">
                <h2>Cérebro da Assistente Virtual</h2>
                <p>Configure a personalidade, o nome e se a assistente está ativa no site.</p>
            </div>

            <div className="admin-ai-form">
                
                <div className="form-row-group">
                    <div className="form-group ai-name-group">
                        <label>Nome da Assistente</label>
                        <input 
                            type="text" 
                            value={config.assistantName}
                            onChange={e => setConfig({...config, assistantName: e.target.value})}
                            placeholder="Ex: Mary, FilipeBot"
                            required
                        />
                    </div>

                    <div className="form-group ai-toggle-group">
                        <label>Status da Assistente</label>
                        <div className="toggle-switch-wrapper">
                            <span className="toggle-label">{config.isActive ? 'Assistente Online no Site' : 'Assistente Desligada'}</span>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={config.isActive}
                                    onChange={e => setConfig({...config, isActive: e.target.checked})}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>System Prompt (Identidade e Regras da IA)</label>
                    <p className="field-hint">Defina como a Mary deve agir, falar e o que ela sabe sobre você. Escreva em formato de instrução clara. Cole seu currículo aqui se desejar.</p>
                    <textarea 
                        value={config.systemPrompt}
                        onChange={e => setConfig({...config, systemPrompt: e.target.value})}
                        placeholder="Você é a assistente virtual..."
                        required
                        className="tall-textarea"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Skills Especializadas (Separadas por vírgula)</label>
                    <p className="field-hint">Liste palavras-chave importantes que a IA deve buscar para dar ênfase (Ex: n8n, Investor Relations, IA).</p>
                    <input 
                        type="text" 
                        value={config.skills}
                        onChange={e => setConfig({...config, skills: e.target.value})}
                        placeholder="n8n, React, Mercado Financeiro..."
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={handleSave} className="save-btn" disabled={saving}>
                        {saving ? 'Salvando...' : 'Salvar Mente da IA'}
                    </button>
                    {message && <span className={`save-status ${message.includes('Erro') ? 'error' : 'success'}`}>{message}</span>}
                </div>
            </div>
        </div>
    );
}
