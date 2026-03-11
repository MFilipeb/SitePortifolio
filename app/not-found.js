import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#040d1a',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '6rem', margin: 0, opacity: 0.5 }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ops! Página não encontrada</h2>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '400px' }}>
        Parece que você se perdeu no espaço digital. O link que você tentou acessar não existe ou foi removido.
      </p>
      <Link href="/" style={{
        padding: '0.8rem 2rem',
        backgroundColor: '#0ea5e9',
        color: '#ffffff',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.39)'
      }}>
        Voltar para a Terra
      </Link>
    </div>
  );
}
