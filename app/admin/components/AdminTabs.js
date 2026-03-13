'use client';

export default function AdminTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'profile', label: '👤 Perfil & Bio' },
        { id: 'appearance', label: '🎨 Estilo & Cores' },
        { id: 'progress', label: '📈 Progresso' },
        { id: 'ai', label: '🤖 Inteligência AI' }
    ];

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '2rem',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            overflowX: 'auto',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        backgroundColor: activeTab === tab.id ? '#0ea5e9' : 'transparent',
                        color: activeTab === tab.id ? '#fff' : '#94a3b8',
                        boxShadow: activeTab === tab.id ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none'
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
