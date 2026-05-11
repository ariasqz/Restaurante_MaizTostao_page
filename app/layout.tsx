import type { Metadata } from 'next';
import { Arvo } from 'next/font/google';
import './globals.css';
import PageLoader from '@/components/PageLoader';

// Fuente Arvo cargada con Next.js Font (optimizada, sin FOUC)
const arvo = Arvo({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Metadatos SEO — equivale al <head> del index.html original
export const metadata: Metadata = {
  title: 'Maiz Tostao Restaurante | Cocina Santandereana y Peruana',
  description:
    'Restaurante Maiz Tostao en Pinchote, Santander. Fusión de cocina santandereana y peruana con ingredientes frescos y sabores auténticos. ¡Reserva tu mesa!',
  keywords:
    'restaurante santander, cocina santandereana, comida peruana, maiz tostao, pinchote, fusión gastronómica, reservas',
  authors: [{ name: 'Maiz Tostao Restaurante' }],
  openGraph: {
    type: 'website',
    siteName: 'Maiz Tostao Restaurante',
    title: 'Maiz Tostao | Cocina Santandereana y Peruana',
    description:
      'Fusión de sabores auténticos en Pinchote, Santander. Reserva tu mesa o pide a domicilio. ¡Ven y vive la experiencia!',
    images: [
      {
        url: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004357/lomo-saltado-1_jyuvo1.jpg',
        width: 1200,
        height: 630,
        alt: 'Plato estrella de Maiz Tostao Restaurante',
      },
    ],
    url: 'https://maiztostao.com.co',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maiz Tostao | Cocina Santandereana y Peruana',
    description: 'Fusión de sabores auténticos en Pinchote, Santander. ¡Reserva tu mesa!',
    images: ['https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004357/lomo-saltado-1_jyuvo1.jpg'],
  },
  icons: {
    icon: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png',
    apple: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={arvo.className}>
      <body>
        {/* Loader de página — se oculta vía JS en entry-client, con noscript queda oculto */}
        <noscript>
          <style>{`#page-loader { display: none !important; }`}</style>
        </noscript>
        <div id="page-loader">
          <div className="loader-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png"
              alt="Maíz Tostao"
              className="loader-logo"
            />
            <div className="loader-bar">
              <div className="loader-fill" />
            </div>
          </div>
        </div>

        <PageLoader />
        {children}
      </body>
    </html>
  );
}
