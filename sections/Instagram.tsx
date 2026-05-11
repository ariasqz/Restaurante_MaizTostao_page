'use client';

import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { ExternalLink, Heart, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Instagram = () => {
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const posts = [
    { image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001191/SaveClip.App_641241086_17856526131616497_21585724097976483_n_vidbhu.jpg', likes: null, comments: null, link: 'https://www.instagram.com/p/DVEZ8AACZ1J/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001253/SaveClip.App_629264123_18064688300644100_1353939720271493304_n_gmjsuo.jpg', likes: null, comments: null, link: 'https://www.instagram.com/p/DUts_j5ERch/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001434/SaveClip.App_541556304_18046621523644100_8773017557661155932_n_vudura.jpg', likes: null, comments: null, link: 'https://www.instagram.com/reel/DORISJ8kSVh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001630/SaveClip.App_539440410_18045644945644100_9010201564138883741_n_isyoit.jpg', likes: null, comments: null, link: 'https://www.instagram.com/p/DN58nD3kQZF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001775/SaveClip.App_524651681_765827495811133_7384363894445476023_n_rdeqfs.jpg', likes: null, comments: null, link: 'https://www.instagram.com/maiz_tostao_restaurante/reel/DMszVT_sQEV/' },
    { image: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777001966/SaveClip.App_523394222_18041578520644100_2615361667120338567_n-1_ou5nwj.webp', likes: null, comments: null, link: 'https://www.instagram.com/maiz_tostao_restaurante/p/DMbvyZKMdou/' },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#E6B800]/10 to-[#E6B800]/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-[#E6B800]/10 to-[#E6B800]/5 rounded-full blur-2xl" />
      <div className="container-custom mx-auto relative z-10">
        <div className={anim(isVisible, 'text-center mb-12')}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#f77737]/10 rounded-full px-4 py-2 mb-6">
            <InstagramIcon className="w-5 h-5 text-[#E6B800]" />
            <span className="text-gray-700 text-sm font-medium">@maiz_tostao_restaurante</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Síguenos en Instagram</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">Descubre nuestros platos, eventos especiales y momentos detrás de cámaras. ¡Únete a nuestra comunidad gastronómica!</p>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full mt-6" />
        </div>
        {/* Botón visitar perfil - después del título */}
        <div className={anim(isVisible, 'text-center mb-12', 'delay-200')}>
          <a href="https://www.instagram.com/maiz_tostao_restaurante/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#f77737] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <InstagramIcon className="w-6 h-6" />
            Visitar Perfil de Instagram
            <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-gray-500 text-sm mt-4">Etiquétanos en tus fotos con <span className="text-[#E6B800] font-medium">#MaizTostao</span> para aparecer en nuestra galería</p>
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {posts.map((post, index) => (
            <a key={index} href={post.link} target="_blank" rel="noopener noreferrer"
              className={hydrated ? `group relative aspect-square rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}` : 'group relative aspect-square rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1'}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}>
              <img src={post.image} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1"><Heart className="w-5 h-5 fill-white" /><span className="text-sm font-medium">{post.likes}</span></div>
                  <div className="flex items-center gap-1"><MessageCircle className="w-5 h-5 fill-white" /><span className="text-sm font-medium">{post.comments}</span></div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Estadísticas - después de las imágenes */}
        <div className={anim(isVisible, 'flex flex-wrap justify-center gap-8', 'delay-700')}>
          <div className="text-center"><p className="font-serif text-3xl font-bold text-[#E6B800]">1.8K+</p><p className="text-gray-500 text-sm">Seguidores</p></div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center"><p className="font-serif text-3xl font-bold text-[#E6B800]">70+</p><p className="text-gray-500 text-sm">Publicaciones</p></div>
          <div className="w-px h-12 bg-gray-200 hidden sm:block" />
          <div className="text-center"><p className="font-serif text-3xl font-bold text-[#E6B800]">4.7</p><p className="text-gray-500 text-sm">Valoración</p></div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
