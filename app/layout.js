import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Filipe Machado | Portfolio & Links",
  description: "Especialista em Investor Relations, Data Science & Wealth Management. Otimizo rentabilidade de portfólios unindo rigor financeiro, Big Data e Automação.",
  keywords: ["Filipe Machado", "Investor Relations", "Wealth Management", "Data Science", "Portfolio", "Links"],
  authors: [{ name: "Filipe Machado" }],
  openGraph: {
    title: "Filipe Machado | Portfolio & Links",
    description: "Conecte-se e conheça meus projetos em Finanças e Tecnologia.",
    url: "https://filipemachado-portfolio.vercel.app",
    siteName: "Portfolio Filipe Machado",
    images: [
      {
        url: "/tech-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Filipe Machado Portfolio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#040d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
