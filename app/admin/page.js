'use client';
import { useState, useEffect } from 'react';

export default function ProfileAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        whatsappNumber: '',
        linkedinUrl: '',
        githubUrl: '',
        cvUrl: '',
        avatarUrl: '/perfil.jpg.jpg',
        bgImageUrl: '/perfil.jpg.jpg'
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/profile');
            const data = await res.json();
            if (data && data.name) {
                setProfile(data);
            }
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            alert('Perfil salvo com sucesso!');
        } catch (error) {
            alert('Erro ao salvar o perfil.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Carregando configurações...</p>;

    return (
        <>
            <div className="admin-header">
                <h1 className="admin-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                    Configurações Gerais
                </h1>
            </div>

            <div className="admin-card">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Nome Principal</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Sua Bio (Aparece abaixo do nome)</label>
                        <textarea
                            name="bio"
                            value={profile.bio || ''}
                            onChange={handleInputChange}
                            rows="4"
                        />
                        <p style={{
                            textAlign: 'right',
                            fontSize: '0.75rem',
                            marginTop: '0.4rem',
                            color: (profile.bio || '').length > 160 ? '#f87171' : '#64748b'
                        }}>
                            {(profile.bio || '').length}/160 caracteres
                        </p>
                    </div>

                    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />
                    <h3 style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 5 5 5" /><path d="m21 10-9.5 9.5-5 1.5 1.5-5L17.5 5.5a2.12 2.12 0 0 1 3 3ZM3 21l3-3" /></svg>
                        Imagens e Arquivos Estáticos
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        Nesta versão, digite o caminho do arquivo estático presente na pasta public do Next.js
                    </p>

                    <div className="form-group">
                        <label>Foto de Perfil / Fundo (Ex: /perfil.jpg)</label>
                        <input
                            type="text"
                            name="bgImageUrl"
                            value={profile.bgImageUrl || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Arquivo do Currículo PDF (Ex: /curriculo.pdf)</label>
                        <input
                            type="text"
                            name="cvUrl"
                            value={profile.cvUrl || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-actions" style={{ justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn-primary" disabled={saving}>
                            {saving ? 'Salvando...' : 'Salvar Alterações Globais'}
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}
