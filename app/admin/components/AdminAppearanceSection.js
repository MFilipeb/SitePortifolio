import React from 'react';
import ColorPicker from '../../components/ColorPicker';

const AdminAppearanceSection = ({ profile, handleInputChange }) => {
    return (
        <div className="admin-card">
            <h3 style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Aparência e Estilo
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
                    <label>Cor do Texto da Página</label>
                    <ColorPicker name="pageTextColor" value={profile.pageTextColor || '#ffffff'} onChange={handleInputChange} />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Ícones Flutuantes</label>
                    <select name="floatingIcons" value={profile.floatingIcons || 'finance'} onChange={handleInputChange}>
                        <option value="none">Desativados</option>
                        <option value="finance">Finanças e IA</option>
                        <option value="construction">Obras / Construção</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AdminAppearanceSection;
