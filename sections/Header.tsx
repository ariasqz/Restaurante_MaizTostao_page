'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Menú', href: '#menu' },
    { name: 'Noticias', href: '#noticias' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#inicio');
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src="https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png"
              alt="Maiz Tostao Logo"
              className={`w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 ${isScrolled ? 'drop-shadow-md' : ''
                }`}
            />
            <div className={`hidden sm:block transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
              <span className="font-serif font-bold text-lg leading-tight">Maíz Tostao</span>
              <span className="block text-xs uppercase tracking-wider opacity-80">Restaurante</span>
            </div>
          </a>

          {/* Navegación escritorio */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-sm font-medium transition-all duration-300 hover:text-[#E6B800] relative group ${isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E6B800] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Botón de llamada a la acción */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+573127528524"
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              Llámanos
            </a>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block text-gray-700 font-medium py-2 hover:text-[#E6B800] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+573127528524"
              className="btn-primary flex items-center justify-center gap-2 w-full mt-4"
            >
              <Phone className="w-4 h-4" />
              Llámanos
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
