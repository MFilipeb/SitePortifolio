'use client';
import { useState, useEffect } from 'react';
import ColorPicker from '../components/ColorPicker';

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
        bgImageUrl: '/perfil.jpg.jpg',
        profileLayout: 'classic',
        titleStyle: 'text',
        titleSize: 'large',
        titleColor: '#ffffff',
        titleFont: 'Inter',
        pageFont: 'Inter',
        pageTextColor: '#ffffff',
        wallpaperStyle: 'image',
        bgColor: '#111111',
        btnStyle: 'outline',
        btnCorner: 'full',
        btnColor: '#ffffff',
        btnTextColor: '#ffffff',
        floatingIcons: 'finance',
        progressShow: true,
        progressLabel: 'Progresso para novo emprego',
        progressValue: 30,
        progressColor: '#ffd700',
        progressBgColor: 'rgba(255, 255, 255, 0.1)'
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
        const { name, value, type, checked } = e.target;
        let finalValue = value;
        if (type === 'checkbox') {
            finalValue = checked;
        } else if (name === 'progressValue') {
            finalValue = parseInt(value, 10);
        }
        setProfile({ ...profile, [name]: finalValue });
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

                    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />
                    <h3 style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Aparência (Estilo Linktree)
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="form-group">
                            <label>Layout do Perfil</label>
                            <select name="profileLayout" value={profile.profileLayout || 'classic'} onChange={handleInputChange}>
                                <option value="classic">Clássico (Foto Redonda)</option>
                                <option value="hero">Hero (Banner Grande)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Estilo do Título</label>
                            <select name="titleStyle" value={profile.titleStyle || 'text'} onChange={handleInputChange}>
                                <option value="text">Texto</option>
                                <option value="logo">Logo / Imagem</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tamanho do Título</label>
                            <select name="titleSize" value={profile.titleSize || 'large'} onChange={handleInputChange}>
                                <option value="small">Pequeno</option>
                                <option value="large">Grande</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Cor do Título</label>
                            <ColorPicker name="titleColor" value={profile.titleColor || '#ffffff'} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Background (Fundo)</label>
                            <select name="wallpaperStyle" value={profile.wallpaperStyle || 'image'} onChange={handleInputChange}>
                                <option value="fill">Cor Sólida</option>
                                <option value="image">Imagem (Com Linhas/Partículas)</option>
                                <option value="image_only">Imagem (Fundo Limpo)</option>
                                <option value="gradient">Gradiente Animado</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Cor de Fundo (Se Sólido/Gradiente)</label>
                            <ColorPicker name="bgColor" value={profile.bgColor || '#111111'} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Estilo dos Botões</label>
                            <select name="btnStyle" value={profile.btnStyle || 'outline'} onChange={handleInputChange}>
                                <option value="solid">Sólido (Preenchido)</option>
                                <option value="outline">Contorno</option>
                                <option value="glass">Vidro (Glassmorphism)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Arredondamento dos Botões</label>
                            <select name="btnCorner" value={profile.btnCorner || 'full'} onChange={handleInputChange}>
                                <option value="square">Quadrado</option>
                                <option value="round">Arredondado Leve</option>
                                <option value="full">Totalmente Arredondado (Pílula)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Cor do Fundo do Botão / Borda</label>
                            <ColorPicker name="btnColor" value={profile.btnColor || '#ffffff'} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Cor do Texto do Botão</label>
                            <ColorPicker name="btnTextColor" value={profile.btnTextColor || '#ffffff'} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Fonte da Página</label>
                            <select name="pageFont" value={profile.pageFont || 'Inter'} onChange={handleInputChange}>
                                <option value="Inter">Inter (Padrão)</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Outfit">Outfit</option>
                                <option value="sans-serif">System Default</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <ColorPicker name="pageTextColor" value={profile.pageTextColor || '#ffffff'} onChange={handleInputChange} />
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Ícones Flutuantes</label>
                            <select name="floatingIcons" value={profile.floatingIcons || 'finance'} onChange={handleInputChange}>
                                <option value="none">Desativados</option>
                                <option value="finance">Finanças e IA (Atual)</option>
                                <option value="construction">Obras / Em Construção (Modelo original)</option>
                            </select>
                        </div>
                    </div>

                    {/* Barra de Progresso */}
                    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />
                    <h3 style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                        Barra de Progresso (Job Progress)
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input 
                                type="checkbox" 
                                name="progressShow" 
                                checked={profile.progressShow !== false} 
                                onChange={handleInputChange} 
                                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            />
                            <label style={{ margin: 0, cursor: 'pointer' }}>Exibir Barra de Progresso no Portfólio</label>
                        </div>

                        <div className="form-group">
                            <label>Texto da Barra (Ex: Progresso em UX/UI)</label>
                            <input type="text" name="progressLabel" value={profile.progressLabel || ''} onChange={handleInputChange} />
                        </div>
                        
                        <div className="form-group">
                            <label>Progresso Adquirido: {profile.progressValue || 0}%</label>
                            <input type="range" name="progressValue" min="0" max="100" value={profile.progressValue || 0} onChange={handleInputChange} style={{ width: '100%', cursor: 'pointer' }} />
                        </div>

                        <div className="form-group">
                            <label>Cor da Barra Linear (Preenchimento)</label>
                            <ColorPicker name="progressColor" value={profile.progressColor || '#ffd700'} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Cor de Fundo Ocultada (Ex: #333333 ou rgba)</label>
                            <ColorPicker name="progressBgColor" value={profile.progressBgColor || 'rgba(255, 255, 255, 0.1)'} onChange={handleInputChange} />
                        </div>
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
