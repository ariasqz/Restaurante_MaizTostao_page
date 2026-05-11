'use client';

import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { Star, ChefHat, Flame, Leaf } from 'lucide-react';

const FeaturedDishes = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  // anim(): sin JS renderiza sin clases → contenido visible; con JS aplica transición
  const anim = (vis: boolean, base = '', delay = '') =>
    hydrated
      ? `${base} transition-all duration-700 ${delay} ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`.trim()
      : base;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const dishes = [
    {
      name: 'Recomendado de la casa',
      description: 'Medallones de lomo fino de res en salsa teriyaki con crocantes de tocineta, acompanado de fetuccini a la huancaina y chips de papa nativa.',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777263248/plato1_ak4l0m.jpg',
      tags: ['Peruano', 'Especialidad'],
      icon: Flame,
    },
    {
      name: 'Mute Santandereano',
      description: 'Sopa ancestral de los andes, elaborada con maiz pelado, carnes seleccionadas, vegetales y guacas cocinados en fogón de leña, acompañado de arroz, yuca al vapor y arepa santandereana.',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004693/mute_goxzwt.jpg',
      tags: ['Santandereano', 'Tradicional'],
      icon: ChefHat,
    },
    {
      name: 'Picada Típica',
      description: 'Carne oreada y fresca, 1/2 pierna pernil, aletilla, chorizos en melado, rellena, acompañado de yuca al vapor, papa criolla y arepa santandereana.',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1776995857/SaveClip.App_649238507_17902694679220833_3216721949678016871_n_tsiin4.jpg',
      tags: ['Santandereano', 'Tradicional'],
      icon: Leaf,
    },
    {
      name: 'Parrillada de mariscos',
      description: 'Pescado y aros de calamar apanados, palmitos y brochetas de camarón a la brasa, tentáculos de pulpo en salsa de la casa y coctel de camaron, acompañado de papa criolla, ensalada y chips de platano.',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1776994060/WhatsApp_Image_2026-04-23_at_20.20.42_dbsle4.jpg',
      tags: ['Fusion', 'Especialidad'],
      icon: Star,
    },
  ];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="section-padding bg-gray-900 relative overflow-hidden"
    >
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#E6B800]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E6B800]/5 rounded-full blur-3xl" />

      <div className="container-custom mx-auto relative z-10">
        {/* Encabezado de sección */}
        <div className={anim(isVisible, 'text-center mb-16')}>
          <span className="inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4">
            Nuestro Menu
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Platos Destacados
          </h2>
          <p className="max-w-2xl mx-auto text-white/70 text-lg">
            Descubre nuestra seleccion de platos mas populares, preparados con los 
            mejores ingredientes y la pasion que nos caracteriza.
          </p>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full mt-6" />
        </div>

        {/* Cuadrícula de platos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dishes.map((dish, index) => (
            <div
              key={dish.name}
              className={hydrated ? `group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#E6B800]/50 transition-all duration-500 card-hover flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}` : 'group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#E6B800]/50 transition-all duration-500 card-hover flex flex-col'}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                
                {/* Etiquetas */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#E6B800] text-white text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Ícono */}
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <dish.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E6B800] transition-colors mb-3">
                  {dish.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed flex-1 mb-4">
                  {dish.description}
                </p>
                <a
                  href={`https://wa.me/573127528524?text=${encodeURIComponent(`¡Hola buen día! 😊 Quisiera ordenar el *${dish.name}*. ¿Me podrían dar más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 border border-white/20 rounded-lg text-white/80 text-sm font-medium hover:bg-[#E6B800] hover:border-[#E6B800] hover:text-white transition-all duration-300 mt-auto text-center block"
                >
                  Ordenar
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Llamada a la acción */}
        <div className={anim(isVisible, 'text-center', 'delay-700')}>
          <a
            href="/Docs/Carta.pdf" download
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ChefHat className="w-5 h-5" />
            Ver la carta
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
