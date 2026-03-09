import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
    const jobs = await prisma.job.findMany({
        include: { company: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="jobs-page" style={{ paddingTop: '2rem' }}>
            <h1 className="section-title">Vagas Disponíveis</h1>
            <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-muted)' }}>
                Encontre a oportunidade ideal para sua carreira.
            </p>

            {jobs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                    <p>Nenhuma vaga encontrada no momento.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                    {jobs.map((job) => (
                        <div key={job.id} style={{
                            background: 'var(--background)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius)',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)' }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{job.title}</h3>
                                {job.salary && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: 'var(--border-color)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{job.salary}</span>}
                            </div>
                            <p style={{ color: 'var(--primary)', fontWeight: 500, marginBottom: '0.5rem' }}>{job.company?.name || 'Empresa Confidencial'}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {job.description}
                            </p>
                            <button className="premium-btn primary-btn" style={{ width: '100%' }}>Ver Detalhes</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
