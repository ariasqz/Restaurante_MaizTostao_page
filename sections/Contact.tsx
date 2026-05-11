'use client';

import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '@/hooks/useHydrated';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

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

const Contact = () => {
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
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    { icon: MapPin, title: 'Dirección', content: 'Km 1 via sangil - pinchote , Pinchote, Santander, Colombia', link: 'https://maps.google.com/?q=Pinchote,Santander,Colombia' },
    { icon: Phone, title: 'Teléfono', content: '+57 312 752 8524', link: 'https://wa.me/573127528524' },
    { icon: Clock, title: 'Horario', content: 'Lun - Dom: 11:30 AM - 8:00 PM', link: null },
  ];

  const socialLinks = [
    { icon: InstagramIcon, href: 'https://www.instagram.com/maiz_tostao_restaurante/', label: 'Instagram' },
    { icon: FacebookIcon, href: 'https://www.facebook.com/maiztostaorestaurante/', label: 'Facebook' },
  ];

  return (
    <section id="contacto" ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6B800]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E6B800]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="container-custom mx-auto relative z-10">
        <div className={anim(isVisible, 'text-center mb-16')}>
          <span className="inline-block text-[#E6B800] text-sm font-semibold uppercase tracking-widest mb-4">Contáctanos</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">Visítanos o Escríbenos</h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">Estamos aquí para hacer de tu experiencia algo inolvidable. Reserva tu mesa o escríbenos para cualquier consulta.</p>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full mt-6" />
        </div>
        <div className="max-w-3xl mx-auto">
          <div className={anim(isVisible, 'space-y-8', 'delay-200')}>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div key={item.title} className="group bg-gray-50 rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-gray-600 text-sm hover:text-[#E6B800] transition-colors">{item.content}</a>
                      ) : (
                        <p className="text-gray-600 text-sm">{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4056.749480567199!2d-73.16960822490189!3d6.541019593451819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e69c1003b2e7845%3A0xd51aee88fae6a347!2sMaiz%20Tostado!5e1!3m2!1ses-419!2sco!4v1776997784523!5m2!1ses-419!2sco"
                width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Maiz Tostao Restaurante"
                className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-600 text-sm">Síguenos:</span>
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#E6B800] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
