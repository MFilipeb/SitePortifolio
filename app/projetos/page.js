'use client';
import { useState, useEffect } from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import FloatingIcons from '../components/FloatingIcons';
import JobProgressBar from '../components/JobProgressBar';
import './projetos.css';

export default function ProjetosPage() {
    const [profile, setProfile] = useState({});
    const [demoProgress, setDemoProgress] = useState(65);
    const [demoIcons, setDemoIcons] = useState('finance');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                const data = await res.json();
                setProfile(data);
                if (data.progressValue !== undefined) {
                    setDemoProgress(data.progressValue);
                }
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const customStyles = {
        '--page-bg': profile.bgColor || '#040d1a',
        '--page-text': profile.pageTextColor || '#ffffff',
        '--title-color': profile.titleColor || '#ffffff',
        '--title-font': profile.titleFont || 'Inter',
        '--page-font': profile.pageFont || 'Inter',
        '--btn-radius': profile.btnCorner === 'square' ? '0px' : profile.btnCorner === 'round' ? '8px' : '30px',
        '--btn-color': profile.btnColor || '#ffffff',
        '--btn-text': profile.btnTextColor || '#000000',
    };

    const projects = [
        {
            title: 'Investor Relations & Analytics',
            tag: 'Big Data & Investor Relations',
            description: 'Painel estruturado para gestão de portfólio imobiliário (R$ 500M+ AUM) focando em performance financeira e KPIs operacionais.',
            mechanics: [
                { name: 'Automação & Integração', desc: 'Sincronização de dados via n8n e manipulação de fluxos complexos em tempo real.' },
                { name: 'Dashboards Dinâmicos', desc: 'Visualização de Yield (retorno) e DREs para reporte de diretoria e investidores.' }
            ],
            demo: 'dashboard'
        },
        {
            title: 'Wealth Management Engine',
            tag: 'Finanças & Alta Renda',
            description: 'Sistema simulador de alocação de ativos e portfólios focados em performance, adequação de risco (Suitability) e redução de churn.',
            mechanics: [
                { name: 'Suitability Assessment', desc: 'Cálculo de perfil de risco para alocação de Fundos Multimercado e Renda Fixa.' },
                { name: 'Cálculo de Rentabilidade', desc: 'Projeção de ativos dinâmicos maximizando Net New Money e otimizando portfólios.' }
            ],
            demo: 'wealth'
        },
        {
            title: 'Site Portifólio Profissional',
            tag: 'Full Stack & UI/UX',
            description: 'A plataforma que você está navegando agora. Criada com foco em performance e experiência do usuário premium.',
            mechanics: [
                { name: 'Barra de Progresso Dinâmica', desc: 'Componente que mostra visualmente o avanço de objetivos.' },
                { name: 'Ícones Flutuantes', desc: 'Partículas temáticas que dão vida ao fundo da página.' },
                { name: 'Glassmorphism Realista', desc: 'Efeito de desfoque profundo com bordas iluminadas.' }
            ],
            demo: 'portfolio'
        },
        {
            title: 'Price Wise AI',
            tag: 'AI & Data Processing',
            description: 'Comparador de preços inteligente que utiliza IA para analisar o melhor momento para compra.',
            mechanics: [
                { name: 'Scraping em Tempo Real', desc: 'Monitoramento constante de preços em diversas lojas.' },
                { name: 'Análise Preditiva', desc: 'IA que sugere se o preço vai cair ou subir.' }
            ],
            demo: 'pricewise'
        }
    ];

    if (loading) return null;

    return (
        <div className="theme-wrapper" style={customStyles} data-wallpaper={profile.wallpaperStyle || 'image'}>
            
            {/* Fundo Dinâmico */}
            {(!profile.wallpaperStyle || profile.wallpaperStyle === 'image' || profile.wallpaperStyle === 'particles' || profile.wallpaperStyle === 'image_only') && (
                <div className="bg-wrapper">
                    <img src={profile.bgImageUrl === '/perfil.jpg' ? '/tech-bg.jpg' : (profile.bgImageUrl || '/tech-bg.jpg')} alt="Background" className="bg-image" />
                    <div className="bg-gradient-overlay"></div>
                </div>
            )}

            {/* 2. Partículas e Ícones Flutuantes (Sincronizado com o ADM) */}
            {(!profile.wallpaperStyle || profile.wallpaperStyle === 'image' || profile.wallpaperStyle === 'particles') && (
                <ParticlesBackground />
            )}
            {profile.floatingIcons !== 'none' && (
                <FloatingIcons type={profile.floatingIcons || 'finance'} />
            )}

            <main className="projects-container">
                <a href="/" className="back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Voltar
                </a>

                <header className="projects-header">
                    <h1 className="projects-title">Vitrine de Mecânicas</h1>
                    <p className="projects-subtitle">Veja como cada engrenagem deste site funciona na prática.</p>
                </header>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-info">
                                <span className="project-tag">{project.tag}</span>
                                <h2 className="project-title">{project.title}</h2>
                                <p className="project-description">{project.description}</p>
                                
                                <div className="mechanics-list">
                                    <h3 className="project-section-title">Mecânicas Usadas</h3>
                                    {project.mechanics.map((m, i) => (
                                        <div key={i} className="mechanic-item">
                                            <span className="mechanic-dot"></span>
                                            <div>
                                                <strong>{m.name}</strong>
                                                <p>{m.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Área de Demonstração Interativa */}
                            <div className="project-demo-box">
                                {project.demo === 'portfolio' ? (
                                    <div className="demo-content">
                                        <div className="interactive-bar-wrapper">
                                            <JobProgressBar 
                                                progressValue={demoProgress} 
                                                progressColor="#0ea5e9"
                                                progressBgColor="rgba(255,255,255,0.1)"
                                                containerStyle={{ margin: '0', width: '100%' }}
                                            />
                                            <input 
                                                type="range" 
                                                min="0" max="100" 
                                                value={demoProgress} 
                                                onChange={(e) => setDemoProgress(e.target.value)}
                                                className="demo-slider-overlay"
                                            />
                                        </div>
                                    </div>
                                ) : project.demo === 'pricewise' ? (
                                    <div className="demo-content pricewise-demo">
                                        <div className="price-scanner">
                                            <div className="scanner-line"></div>
                                            <div className="price-tag">R$ 1.250,00</div>
                                            <div className="price-analysis">Analisando com IA...</div>
                                        </div>
                                    </div>
                                ) : project.demo === 'dashboard' ? (
                                    <div className="demo-content dashboard-demo">
                                        <div className="dash-widget">
                                            <div className="dash-header">AUM (Ativos Sob Gestão)</div>
                                            <div className="dash-value">R$ 512M</div>
                                            <div className="dash-chart">
                                                <div className="bar b1"></div>
                                                <div className="bar b2"></div>
                                                <div className="bar b3"></div>
                                                <div className="bar b4"></div>
                                                <div className="bar b5"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="demo-content wealth-demo">
                                        <div className="wealth-widget">
                                            <div className="wealth-header">Asset Allocation</div>
                                            <div className="allocation-bar">
                                                <div className="segment fixed" style={{ width: '65%' }}>Fixa</div>
                                                <div className="segment variable" style={{ width: '35%' }}>Var</div>
                                            </div>
                                            <div className="wealth-stats">
                                                <span>Risco Controlado</span>
                                                <span className="positive">Yield: +12.4%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
