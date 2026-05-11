'use client';

import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { Target, Eye, Heart, Star, Volume2, VolumeX } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hydrated = useHydrated();

  // En SSR sin hydrated: sin clases de animación → todo visible
  // En cliente con hydrated: transiciones normales por IntersectionObserver
  const anim = (visible: boolean, extra = '') =>
    hydrated
      ? `transition-all duration-700 ${extra} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
      : extra;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Cada plato es preparado con amor y dedicación.',
    },
    {
      icon: Star,
      title: 'Calidad',
      description: 'Ingredientes frescos y de la más alta calidad.',
    },
    {
      icon: Target,
      title: 'Tradición',
      description: 'Rescatamos los sabores auténticos de nuestra tierra.',
    },
  ];

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6B800]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E6B800]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom mx-auto relative z-10">
        {/* Encabezado de sección */}
        <div className={anim(isVisible, "text-center mb-16")}>
          <span className="inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4">
            Conócenos
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Somos más que un restaurante
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
        </div>

        {/* Cuadrícula de contenido principal */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Lado de imagen/video */}
          <div className={hydrated ? `relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}` : "relative"}>
            <div className="relative">
              {/* Video principal */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  className="w-full h-[650px] object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004357/lomo-saltado-1_jyuvo1.jpg"
                >
                  <source src="https://res.cloudinary.com/dwhbqktyy/video/upload/v1776996636/SaveClip.App_AQPBCTjjuiOuX9ss9krkCD_wHQfEeuD2clA1MxTYWHu_F_g7GxLNz2GbXMy83Kmcqc5Gjz3yeZVpfRediApCNh6B_x6le6v.mp4" type="video/mp4" />
                  Tu navegador no soporta video.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Botón silenciar / activar audio */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium hover:bg-black/70 active:scale-95 transition-all duration-200 group"
                >
                  {isMuted
                    ? <VolumeX className="w-4 h-4 text-white/80 group-hover:text-white" />
                    : <Volume2 className="w-4 h-4 text-[#E6B800]" />
                  }
                  <span className="hidden sm:inline">{isMuted ? 'Sin audio' : 'Con audio'}</span>
                </button>
              </div>

              {/* Marco decorativo */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#E6B800]/30 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Lado de texto */}
          <div className={hydrated ? `transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}` : ""}>
            {/* Misión */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Somos una empresa dedicada a rescatar los sabores tradicionales santandereanos
                y peruanos fusionándolos a través de la cocina de autor, con el sabor y
                autenticidad que nos representa, ofreciéndoles a los clientes platos únicos
                que transmiten nuestra pasión por este arte.
              </p>
            </div>

            {/* Visión */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">Nuestra Visión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser reconocidos como un referente gastronómico en Santander y Colombia,
                por nuestra autenticidad en la cocina de autor que enaltece la tradición
                santandereana y peruana. Queremos consolidarnos como un espacio donde cada
                plato sea una experiencia inolvidable, generando orgullo cultural, satisfacción
                plena en nuestros clientes y un impacto positivo en la comunidad.
              </p>
            </div>

            {/* Llamada a la acción */}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              Conoce más de nosotros
            </a>
          </div>
        </div>

        {/* Cuadrícula de valores */}
        <div className={anim(isVisible, "grid md:grid-cols-3 gap-8 delay-600")}>
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-500 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
