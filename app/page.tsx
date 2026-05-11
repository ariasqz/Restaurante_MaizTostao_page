// Componente de servidor — Next.js renderiza esto en el servidor (SSR)
// No necesita 'use client' porque no usa hooks ni eventos directamente.
// Los componentes hijos que sí necesitan interactividad tienen 'use client'.

import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import FeaturedDishes from '@/sections/FeaturedDishes';
import News from '@/sections/News';
import Instagram from '@/sections/Instagram';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedDishes />
        <News />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppWidget />
    </div>
  );
}
