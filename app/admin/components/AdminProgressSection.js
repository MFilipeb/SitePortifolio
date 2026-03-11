import React from 'react';
import ColorPicker from '../../components/ColorPicker';

const AdminProgressSection = ({ profile, handleInputChange }) => {
    return (
        <div className="admin-card">
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
                    <label>Cor da Barra (Preenchimento)</label>
                    <ColorPicker name="progressColor" value={profile.progressColor || '#ffd700'} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Cor de Fundo da Barra</label>
                    <ColorPicker name="progressBgColor" value={profile.progressBgColor || 'rgba(255, 255, 255, 0.1)'} onChange={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

export default AdminProgressSection;
