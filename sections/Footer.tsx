'use client';

import { MapPin, Phone, Clock, Heart } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Menú', href: '#menu' },
    { name: 'Noticias', href: '#noticias' },
    { name: 'Contacto', href: '#contacto' },
  ];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E6B800]/50 to-transparent" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-[#E6B800]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#E6B800]/5 rounded-full blur-3xl" />
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png" alt="Maiz Tostao Logo" className="w-14 h-14 object-contain" />
              <div>
                <span className="font-serif font-bold text-xl block">Maiz Tostao</span>
                <span className="text-white/60 text-xs uppercase tracking-wider">Restaurante</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">Cocina de autor que fusiona los sabores tradicionales santandereanos y peruanos. Cada plato es una experiencia inolvidable.</p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/maiz_tostao_restaurante/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6B800] flex items-center justify-center transition-all duration-300" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/maiztostaorestaurante/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E6B800] flex items-center justify-center transition-all duration-300" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-white/70 hover:text-[#E6B800] transition-colors text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E6B800] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Km 1 via San Gil - Pinchote, Pinchote, Santander, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E6B800] flex-shrink-0" />
                <a href="https://wa.me/573127528524" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#E6B800] transition-colors text-sm">+57 312 752 8524</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#E6B800] flex-shrink-0" />
                <span className="text-white/70 text-sm">Lun - Dom: 11:30 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">© {currentYear} Maiz Tostao Restaurante. Todos los derechos reservados.</p>
            <p className="text-white/50 text-sm flex items-center gap-1">Hecho con <Heart className="w-4 h-4 text-[#E6B800] fill-[#E6B800]" /> en Pinchote, Santander</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
