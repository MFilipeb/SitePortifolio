'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ParticlesBackground from '../components/ParticlesBackground';
import FloatingIcons from '../components/FloatingIcons';
import './cases.css';

export default function CasesPage() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        setProfile(data || {});
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
    '--btn-radius':
      profile.btnCorner === 'square'
        ? '0px'
        : profile.btnCorner === 'round'
        ? '8px'
        : '30px',
    '--btn-color': profile.btnColor || '#ffffff',
    '--btn-text': profile.btnTextColor || '#000000',
  };

  const cases = [
    {
      id: 'financas-pessoais',
      tag: 'Finanças Pessoais & Organização',
      title: 'Organização de Finanças Pessoais com Mentalidade de Gestor',
      context:
        'Cenário de renda variável ao longo do tempo, múltiplos bancos e falta de visão consolidada de patrimônio.',
      action:
        'Estruturei planilhas e dashboards de fluxo de caixa e patrimônio, definindo metas mensais de aporte e regras simples de alocação.',
      result:
        'Transformei um cenário caótico em um plano previsível de aportes, com controle claro de patrimônio líquido e redução de decisões por impulso.',
    },
    {
      id: 'portfolio-estudos',
      tag: 'Investimentos & Rotina de Estudos',
      title: 'Plano de Estudos Guiado por Portfólio',
      context:
        'Queria acelerar a transição para o mercado financeiro sem estudar de forma solta, sem direção.',
      action:
        'Montei uma trilha de estudos conectada a casos reais (renda fixa, fundos, ações), registrando aprendizados e dúvidas dentro do meu próprio portfolio digital.',
      result:
        'Criei um histórico rastreável de evolução, que hoje serve como “log de raciocínio” para mostrar para recrutadores como penso e tomo decisão.',
    },
    {
      id: 'tech-ia',
      tag: 'Tecnologia & IA aplicada',
      title: 'Uso de IA para Decisão e Comunicação em Finanças',
      context:
        'Precisava traduzir temas complexos de mercado financeiro em linguagem clara para diferentes públicos.',
      action:
        'Passei a usar modelos de IA para revisar textos, criar resumos de estudos e testar explicações de conceitos financeiros em diferentes níveis de profundidade.',
      result:
        'Aprimorei minha comunicação, ganhei velocidade para aprender novos produtos financeiros e documentei tudo em componentes visuais dentro deste site.',
    },
  ];

  if (loading) return null;

  return (
    <div
      className="theme-wrapper"
      style={customStyles}
      data-wallpaper={profile.wallpaperStyle || 'image'}
    >
      {(!profile.wallpaperStyle ||
        profile.wallpaperStyle === 'image' ||
        profile.wallpaperStyle === 'particles' ||
        profile.wallpaperStyle === 'image_only') && (
        <div className="bg-wrapper">
          <Image
            src={
              profile.bgImageUrl === '/perfil.jpg'
                ? '/tech-bg.jpg'
                : profile.bgImageUrl || '/tech-bg.jpg'
            }
            alt="Background"
            fill
            priority
            className="bg-image"
            style={{ objectFit: 'cover' }}
          />
          <div className="bg-gradient-overlay" />
        </div>
      )}

      {(!profile.wallpaperStyle ||
        profile.wallpaperStyle === 'image' ||
        profile.wallpaperStyle === 'particles') && <ParticlesBackground />}

      {profile.floatingIcons !== 'none' && (
        <FloatingIcons type={profile.floatingIcons || 'finance'} />
      )}

      <main className="cases-container">
        <Link href="/" className="btn-back">
          ← Voltar
        </Link>

        <header className="cases-header">
          <h1 className="cases-title">Cases reais</h1>
          <p className="cases-subtitle">
            Histórias curtas que conectam finanças, tecnologia e evolução de
            carreira.
          </p>
        </header>

        <section className="cases-grid">
          {cases.map((item) => (
            <article key={item.id} className="case-card">
              <span className="case-tag">{item.tag}</span>
              <h2 className="case-title">{item.title}</h2>
              <div className="case-body">
                <div className="case-section">
                  <h3>Contexto</h3>
                  <p>{item.context}</p>
                </div>
                <div className="case-section">
                  <h3>Ação</h3>
                  <p>{item.action}</p>
                </div>
                <div className="case-section">
                  <h3>Resultado</h3>
                  <p>{item.result}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

