import './projetos.css';

export default function ProjetosPage() {
    const projects = [
        {
            title: 'Price Wise',
            tag: 'AI & Data Processing',
            description: 'Comparador de preços inteligente que utiliza Inteligência Artificial para otimizar a experiência de compra.',
            howItWasDone: 'Desenvolvido como uma aplicação web dinâmica que consome APIs de IA (Gemini) para processamento semântico de buscas. Implementamos um sistema de scraping e monitoramento de dados para fornecer resultados em tempo real.',
            activities: 'Arquitetura do sistema de busca via IA, design de interface em Glassmorphism, implementação de sistema de alertas e otimização de performance.',
            technologies: ['JavaScript', 'Gemini AI', 'Vanilla CSS', 'Web Scraping', 'HTML5']
        },
        {
            title: 'Site Portifolio',
            tag: 'Full Stack Development',
            description: 'Plataforma profissional para gestão de links, biografia e showcase de projetos.',
            howItWasDone: 'Construído com Next.js 15 e React 19 para garantir máximo desempenho e SEO. Utilizamos Prisma como ORM para gerenciar o banco de dados PostgreSQL (Neon) e NextAuth para segregar o acesso administrativo.',
            activities: 'Desenvolvimento do painel administrativo, integração com banco de dados relacional, sistema de autenticação personalizada e estilização premium responsiva.',
            technologies: ['Next.js 15', 'React 19', 'Prisma', 'PostgreSQL', 'NextAuth', 'CSS Modules']
        }
    ];

    return (
        <main className="projects-container">
            <a href="/" className="back-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Voltar
            </a>

            <header className="projects-header">
                <h1 className="projects-title">Meus Projetos</h1>
                <p className="projects-subtitle">Como foram construídos e os resultados alcançados.</p>
            </header>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                        <span className="project-tag">{project.tag}</span>
                        <h2 className="project-title">{project.title}</h2>
                        <p className="project-description">{project.description}</p>
                        
                        <div className="project-details">
                            <div>
                                <h3 className="project-section-title">Como foi feito</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>{project.howItWasDone}</p>
                            </div>
                            <div>
                                <h3 className="project-section-title">O que eu realizei</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>{project.activities}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="project-section-title">Tecnologias</h3>
                            <div className="technologies-list">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
