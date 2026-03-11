'use client';
import { useState, useEffect } from 'react';
import AdminProfileSection from './components/AdminProfileSection';
import AdminAppearanceSection from './components/AdminAppearanceSection';
import AdminProgressSection from './components/AdminProgressSection';

/**
 * Painel Administrativo do Perfil
 * Aqui você controla tudo o que aparece no seu site.
 * O código foi dividido em pequenas partes (componentes) para ser mais fácil de ler.
 */
export default function ProfileAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        bgImageUrl: '/perfil.jpg',
        cvUrl: '',
        profileLayout: 'classic',
        titleStyle: 'text',
        titleSize: 'large',
        titleColor: '#ffffff',
        wallpaperStyle: 'image',
        bgColor: '#111111',
        btnStyle: 'outline',
        btnCorner: 'full',
        btnColor: '#ffffff',
        btnTextColor: '#ffffff',
        pageFont: 'Inter',
        pageTextColor: '#ffffff',
        floatingIcons: 'finance',
        progressShow: true,
        progressLabel: 'Progresso para novo emprego',
        progressValue: 30,
        progressColor: '#ffd700',
        progressBgColor: 'rgba(255, 255, 255, 0.1)'
    });

    // 1. Busca as informações atuais quando a página carrega
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
            console.error('Erro ao carregar perfil:', error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Lida com as mudanças que você faz nas caixinhas de texto
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

    // 3. Salva tudo no banco de dados quando você clica no botão "Salvar"
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (res.ok) {
                alert('✨ Sucesso! Suas alterações foram salvas.');
            } else {
                alert('❌ Algo deu errado ao salvar.');
            }
        } catch (error) {
            alert('❌ Erro de conexão ao salvar.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            <p>Carregando as configurações...</p>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} style={{ paddingBottom: '4rem' }}>
            {/* Cabeçalho do Painel */}
            <div className="admin-header">
                <h1 className="admin-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', verticalAlign: 'middle' }}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                    Painel de Controle
                </h1>
            </div>

            {/* SEÇÃO 1: INFORMAÇÕES PESSOAIS */}
            <AdminProfileSection profile={profile} handleInputChange={handleInputChange} />

            {/* SEÇÃO 2: ESTILO E CORES */}
            <AdminAppearanceSection profile={profile} handleInputChange={handleInputChange} />

            {/* SEÇÃO 3: BARRA DE PROGRESSO */}
            <AdminProgressSection profile={profile} handleInputChange={handleInputChange} />

            {/* Botão Flutuante de Salvar */}
            <div className="form-actions" style={{ 
                position: 'fixed', 
                bottom: '2rem', 
                right: '2rem', 
                zIndex: 100, 
                backgroundColor: 'rgba(4, 13, 26, 0.8)',
                padding: '1rem',
                borderRadius: '1rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
                <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '0.8rem 2rem' }}>
                    {saving ? '⏳ Salvando...' : '💾 Salvar Tudo'}
                </button>
            </div>
        </form>
    );
}
