'use client';
import { useState, useEffect } from 'react';

export default function LinksAdmin() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentLink, setCurrentLink] = useState(null);
    const [formData, setFormData] = useState({ title: '', url: '', iconType: 'link' });
    const [message, setMessage] = useState({ type: '', text: '' });

    // Fetch Links on load
    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch('/api/links');
            const data = await res.json();
            setLinks(data);
        } catch (error) {
            console.error('Failed to fetch links');
        } finally {
            setLoading(false);
        }
    };

    // Form Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openCreateForm = () => {
        setFormData({ title: '', url: '', iconType: 'link' });
        setCurrentLink(null);
        setIsEditing(true);
    };

    const openEditForm = (link) => {
        setFormData({ title: link.title, url: link.url, iconType: link.iconType || 'link' });
        setCurrentLink(link.id);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setCurrentLink(null);
    };

    // Submit Logic (Create/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const method = currentLink ? 'PUT' : 'POST';
        const endpoint = currentLink ? `/api/links/${currentLink}` : '/api/links';

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Erro ao realizar a operação');
            }

            setMessage({ type: 'success', text: currentLink ? 'Link atualizado com sucesso!' : 'Novo link criado com sucesso!' });
            await fetchLinks(); // Refresh list
            setIsEditing(false);
            
            // Clear success message after 3 seconds
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: error.message || 'Erro ao salvar o link' });
        } finally {
            setLoading(false);
        }
    };

    // Delete Logic
    const handleDelete = async (id) => {

        setLoading(true);
        try {
            const res = await fetch(`/api/links/${id}`, { method: 'DELETE' });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Erro ao deletar o link');
            }

            setMessage({ type: 'success', text: 'Link removido com sucesso!' });
            await fetchLinks();
            
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: error.message || 'Erro ao apagar link' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="admin-header">
                <h1 className="admin-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                    Gerenciar Meus Links
                </h1>
                {!isEditing && (
                    <button className="btn-primary" onClick={openCreateForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Novo Link
                    </button>
                )}
            </div>

            {message.text && (
                <div 
                    className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`} 
                    style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        borderLeft: message.type === 'success' ? '4px solid #10b981' : '4px solid #ef4444',
                        color: message.type === 'success' ? '#10b981' : '#ef4444'
                    }}
                >
                    <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>
                        {message.type === 'success' ? '✅' : '❌'}
                    </span>
                    {message.text}
                </div>
            )}

            {/* CREATE / EDIT FORM */}
            {isEditing && (
                <div className="admin-card">
                    <h2>{currentLink ? 'Editar Link' : 'Novo Link'}</h2>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                        <div className="form-group">
                            <label>Título Aparento no Botão</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Ex: Meu GitHub"
                            />
                        </div>

                        <div className="form-group">
                            <label>URL de Destino</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                required
                                placeholder="https://... ou /caminho-local"
                            />
                        </div>

                        <div className="form-group">
                            <label>Ícone à Esquerda (Opcional)</label>
                            <select name="iconType" value={formData.iconType} onChange={handleInputChange}>
                                <option value="link">Padrão</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="github">GitHub</option>
                                <option value="document">Currículo/PDF</option>
                                <option value="lightning">Raio (Case)</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={cancelEdit} disabled={loading}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Carregando...' : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                                        Salvar no Linktree
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* LINKS LIST */}
            {!isEditing && (
                <div className="admin-card">
                    {loading && <p>Carregando seus links...</p>}
                    {!loading && links.length === 0 && <p>Nenhum link cadastrado ainda.</p>}

                    <div className="link-list">
                        {links.map((link) => (
                            <div key={link.id} className="link-item">
                                <div className="link-info">
                                    <h3>{link.title}</h3>
                                    <p>{link.url}</p>
                                </div>
                                <div className="link-actions">
                                    <button className="btn-ghost" onClick={() => openEditForm(link)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                                        Editar
                                    </button>
                                    <button className="btn-ghost delete" onClick={() => handleDelete(link.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
