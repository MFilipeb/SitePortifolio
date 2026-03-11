import React from 'react';

const AdminProfileSection = ({ profile, handleInputChange }) => {
    return (
        <div className="admin-card">
            <h3 style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Informações de Perfil
            </h3>
            
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
                Digite o caminho do arquivo presente na pasta <strong>public</strong> (Ex: /minha-foto.jpg)
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
        </div>
    );
};

export default AdminProfileSection;
