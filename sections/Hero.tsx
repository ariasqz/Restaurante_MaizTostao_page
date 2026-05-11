'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown, Utensils } from 'lucide-react';
import { useState } from 'react';
import ReservationModal from '@/components/ReservationModal';
import { useHydrated } from '@/hooks/useHydrated';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useEffect(() => {
    // Activar la animación de entrada solo en el cliente
    setIsVisible(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // En SSR (hydrated=false): sin clases de animación → contenido visible
  // En cliente (hydrated=true): aplica la transición opacity/translate
  const animClass = hydrated
    ? `transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
    : '';

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo con superposición */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004357/lomo-saltado-1_jyuvo1.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#E6B800]/30 rounded-full animate-float opacity-50" />
      <div className="absolute bottom-40 right-20 w-24 h-24 border border-[#E6B800]/20 rounded-full animate-float animation-delay-400 opacity-40" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-white/10 rounded-full animate-float animation-delay-800 opacity-30" />

      {/* Contenido principal */}
      <div className="relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={animClass}>
          {/* Insignia */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Utensils className="w-4 h-4 text-[#E6B800]" />
            <span className="text-white/90 text-sm font-medium">Cocina de Autor Santandereana - Peruana</span>
          </div>

          {/* Título principal */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="block">Maíz Tostao</span>
            <span className="block text-[#E6B800] mt-2">Restaurante</span>
          </h1>

          {/* Eslogan */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light italic mb-4">
            "Lo mejor Está Por Servirse"
          </p>

          {/* Descripción */}
          <p className="max-w-2xl mx-auto text-white/70 text-base sm:text-lg mb-10 leading-relaxed">
            Descubre la fusión única de sabores tradicionales santandereanos y peruanos,
            elaborados con pasión y autenticidad en cada plato.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => scrollToSection('#menu')}
              className="btn-primary flex items-center gap-2 text-base"
            >
              <Utensils className="w-5 h-5" />
              Ver Menú
            </button>
            <button onClick={() => setShowModal(true)} className="btn-secondary text-base">
              Reservar Mesa
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de desplazamiento */}
      <button
        onClick={() => scrollToSection('#nosotros')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-[#E6B800] transition-colors animate-bounce"
        aria-label="Desplazar hacia abajo"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      {showModal && <ReservationModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Hero;
