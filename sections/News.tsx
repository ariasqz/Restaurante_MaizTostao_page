'use client';

import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';

const News = () => {
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

  const news = [
    {
      title: 'Burguer Fest 2026',
      description: 'Una experiencia que reúne lo mejor de nuestra cocina, identidad y sabor.',
      date: '18 - 26 Abril 2026',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1776998408/SaveClip.App_670750891_18077010872280498_5378731961807402164_n_ps6aae.jpg',
      link: 'https://www.instagram.com/reel/DWytw_cjqYC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      featured: true,
    },
    {
      title: 'Expo Turismo 2025',
      description: 'Un evento especial donde celebramos la fusión de la cocina santandereana y peruana en una experiencia única.',
      date: '31 Mayo 2025',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777003455/SaveClip.App_533118353_18190583434316616_6957001046809440780_n_mrgecw.jpg',
      link: 'https://www.instagram.com/reel/DNTCoT7tch1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      featured: false,
    },
    {
      title: 'Un pedacito de historia',
      description: 'Descubre los orígenes de nuestros platos más emblemáticos y la historia detrás de cada receta.',
      date: null,
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001775/SaveClip.App_524651681_765827495811133_7384363894445476023_n_rdeqfs.jpg',
      link: 'https://www.instagram.com/reel/DNTCoT7tch1/',
      featured: false,
    },
    {
      title: '2 Tierras, Una Mesa',
      description: 'Un evento especial donde celebramos la fusión de la cocina santandereana y peruana en una experiencia única.',
      date: '31 Mayo 2025',
      image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777003572/SaveClip.App_523476142_18041578511644100_2848167722203951464_n_c5wp5y.webp',
      link: 'https://www.instagram.com/p/DMbvyZKMdou/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      featured: false,
    },
  ];

  return (
    <section
      id="noticias"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-[#E6B800]/5 rounded-full translate-x-1/2" />

      <div className="container-custom mx-auto relative z-10">
        {/* Encabezado de sección */}
        <div className={anim(isVisible, 'flex flex-col md:flex-row md:items-end md:justify-between mb-16')}>
          <div>
            <span className="inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4">
              Novedades
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
              Noticias & Eventos
            </h2>
          </div>
          <a
            href="https://www.instagram.com/maiz_tostao_restaurante/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#E6B800] font-medium hover:gap-3 transition-all"
          >
            Ver todas las novedades
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Llamada a la acción para eventos */}
        <div className={anim(isVisible, 'mb-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center', 'delay-300')}>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Deseas realizar un evento?
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Tenemos opciones especiales para celebraciones, reuniones corporativas y eventos privados. 
            Descarga nuestro menú especial para eventos.
          </p>
          <a
            href="/Docs/MENÚ EVENTOS 2026.pdf" 
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Descargar Menú de Eventos
          </a>
        </div>

        {/* Cuadrícula de noticias */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Noticia destacada */}
          <div
            className={hydrated ? `group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}` : 'group relative rounded-2xl overflow-hidden shadow-xl'}
          >
            <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
              <img
                src={news[0].image}
                alt={news[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Contenido de la noticia destacada */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#E6B800] text-white text-xs font-semibold rounded-full">
                    Destacado
                  </span>
                  <span className="flex items-center gap-1 text-white/80 text-sm">
                    <Calendar className="w-4 h-4" />
                    {news[0].date}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#E6B800] transition-colors">
                  {news[0].title}
                </h3>
                <p className="text-white/80 mb-6 line-clamp-2">
                  {news[0].description}
                </p>
                <a
                  href={news[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-[#E6B800] transition-colors"
                >
                  Ver más
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Otras noticias */}
          <div className="space-y-6">
            {news.slice(1).map((item, index) => (
              <div
                key={item.title}
                className={hydrated ? `group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 card-hover ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}` : 'group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 card-hover'}
                style={{ transitionDelay: `${(index + 1) * 200 + 200}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Imagen */}
                  <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Contenido */}
                  <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-[#E6B800]" />
                      <span className="text-gray-500 text-sm">{item.date}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E6B800] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#E6B800] font-medium text-sm hover:gap-3 transition-all"
                    >
                      Ver más
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
