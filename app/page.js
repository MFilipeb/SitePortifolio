import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import ParticlesBackground from './components/ParticlesBackground';
import FloatingIcons from './components/FloatingIcons';
import JobProgressBar from './components/JobProgressBar';
import LinkCard from './components/LinkCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Busca dados do banco de dados (PostgreSQL via Prisma)
  // Esse código roda no servidor de forma segura
  const profile = await prisma.profile.findFirst() || {};
  const links = await prisma.link.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  // Cores e estilos que a pessoa escolheu no painel ADM
  const customStyles = {
    '--page-bg': profile.bgColor || '#040d1a',
    '--page-text': profile.pageTextColor || '#ffffff',
    '--title-color': profile.titleColor || '#ffffff',
    '--title-font': profile.titleFont || 'Inter',
    '--page-font': profile.pageFont || 'Inter',
    '--btn-radius': profile.btnCorner === 'square' ? '0px' : profile.btnCorner === 'round' ? '8px' : profile.btnCorner === 'rounder' ? '16px' : '30px',
    '--btn-color': profile.btnColor || '#ffffff',
    '--btn-text': profile.btnTextColor || '#000000',
  };

  return (
    <div className="theme-wrapper" style={customStyles} data-wallpaper={profile.wallpaperStyle || 'image'}>
      
      {/* 1. Fundo da Página (Papel de parede) */}
      {(!profile.wallpaperStyle || profile.wallpaperStyle === 'image' || profile.wallpaperStyle === 'particles' || profile.wallpaperStyle === 'image_only') && (
        <div className="bg-wrapper">
          <Image
            src={profile.bgImageUrl === '/perfil.jpg' ? '/tech-bg.jpg' : (profile.bgImageUrl || '/tech-bg.jpg')}
            alt="Background"
            fill
            priority
            className="bg-image"
            style={{ objectFit: 'cover' }}
          />
          <div className="bg-gradient-overlay"></div>
        </div>
      )}

      {/* 2. Partículas (Pontinhos que se mexem) */}
      {(!profile.wallpaperStyle || profile.wallpaperStyle === 'image' || profile.wallpaperStyle === 'particles') && (
        <ParticlesBackground />
      )}

      {/* 3. Ícones Flutuantes */}
      {profile.floatingIcons !== 'none' && (
        <FloatingIcons type={profile.floatingIcons || 'finance'} />
      )}

      {/* 4. Conteúdo Principal */}
      <main className="linktree-container">
        
        {/* Cabeçalho (Foto e Nome) */}
        <section className={`profile-section layout-${profile.profileLayout || 'classic'}`}>
          <Image src="/perfil_filipe.jpg" alt="Foto de Perfil" width={180} height={180} priority className="profile-logo" />
          
          <h1 className="profile-name" style={{ fontSize: profile.titleSize === 'large' ? '2.2rem' : '1.6rem' }}>
            {profile.name || 'Filipe Machado'}
          </h1>

          {/* Biografia (Quem você é) */}
          <p className="profile-bio">
            {profile.bio ? profile.bio.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            )) : 'Especialista em Investor Relations'}
          </p>

          {/* Links rápidos de posicionamento */}
          <div className="profile-quick-links">
            <a href="/cases" className="profile-secondary-link">
              Ver meus cases reais
            </a>
            <a href="/projetos" className="profile-secondary-link profile-secondary-link--ghost">
              Ver vitrine de mecânicas
            </a>
          </div>
        </section>

        {/* Lista de Links (Botões) */}
        <section className="links-grid">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} profile={profile} />
          ))}
        </section>

        {/* Barra de Progresso (Se estiver ativada) */}
        {profile.progressShow !== false && (
            <JobProgressBar 
                progressShow={profile.progressShow}
                progressLabel={profile.progressLabel}
                progressValue={profile.progressValue}
                progressColor={profile.progressColor}
                progressBgColor={profile.progressBgColor}
            />
        )}

      </main>
    </div>
  );
}
