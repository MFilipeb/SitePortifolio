import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch dynamic data from SQLite via Prisma
  // We use Server Components, so this runs on the server securely
  const profile = await prisma.profile.findFirst() || {};
  const links = await prisma.link.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  return (
    <>
      {/* Background fixed wrapper */}
      <div className="bg-wrapper">
        <img
          src={profile.bgImageUrl || '/nature-bg.jpg'}
          alt="Background Mode"
          className="bg-image"
        />
        <div className="bg-gradient-overlay"></div>
      </div>

      <main className="linktree-container">
        {/* Top Left Icon removed per user request */}

        {/* Profile Section */}
        <section className="profile-section">
          <h1 className="profile-name">{profile.name || 'Filipe Machado'}</h1>

          {/* Render bio with line breaks if any */}
          <p className="profile-bio">
            {profile.bio ? profile.bio.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            )) : 'Especialista em Investor Relations'}
          </p>

          {/* Floating WhatsApp Icon removed per user request */}
        </section>

        {/* Dynamic Links Section */}
        <section className="links-grid">
          {links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="link-card">

              {/* Optional Left Icon based on Data */}
              {link.iconType === 'whatsapp' && (
                <div className="link-icon">
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '50%', padding: '6px', display: 'flex' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.614-.087-.112-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.002 3.828-3.116 6.938-6.937 6.938z" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="link-content">
                <h2 className="link-title">{link.title}</h2>
                {link.iconType === 'document' && <p className="link-subtitle">Document</p>}
              </div>

              <div className="link-options-dots">⋮</div>
            </a>
          ))}
        </section>

      </main>
    </>
  );
}
