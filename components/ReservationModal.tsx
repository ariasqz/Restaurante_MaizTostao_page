'use client';

import { useState, useEffect, useRef } from 'react';
import {
  X, ChevronLeft, ChevronRight, Check, Calendar, Clock,
  User, Users, Phone, MessageCircle, Copy, CheckCircle, ZoomIn,
} from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  celebrantLabel: string;
  icon: string;
}
interface FormData {
  celebrantName: string;
  reservantName: string;
  phone: string;
  guests: number;
  notes: string;
}

const SERVICES: Service[] = [
  {
    id: 'sin-decoracion',
    name: 'Sin decoración',
    description: 'Reserva tu mesa sin decoración adicional. Solo ven y disfruta de nuestra cocina.',
    price: 0,
    images: [
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777863516/WhatsApp_Image_2026-05-03_at_21.28.34_1_owppfe.jpg',
    ],
    celebrantLabel: '',
    icon: '',
  },
  {
    id: 'cumpleaños',
    name: 'Feliz cumpleaños Sencilla',
    description: 'Globos en helio, banner personalizado, Individuales, montaje de la mesa, 1 postre de cumpleaños y ruleta ganadora.',
    price: 40000,
    images: [
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.54_vuqjsr.jpg',
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.54_1_ubzhiu.jpg',
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.54_2_qii9ni.jpg',
    ],
    celebrantLabel: '¿Quién cumple años?',
    icon: '',
  },
  {
    id: 'grado',
    name: 'Feliz cumpleaños con petalos',
    description: 'Globos en helio, petalos de rosas, banner personalizado, Individuales, montaje de la mesa, 1 postre de cumpleaños y ruleta ganadora.',
    price: 50000,
    images: [
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777863515/WhatsApp_Image_2026-05-03_at_21.25.46_oggdw4.jpg',
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777863516/WhatsApp_Image_2026-05-03_at_21.24.51_unnknz.jpg',
    ],
    celebrantLabel: '¿Quién cumple años?',
    icon: '',
  },
  {
    id: 'aniversario',
    name: 'Feliz Aniversario',
    description: 'Globos en helio, velas decorativas, banner personalizado, letrero LOVE, decoración romántica para la ocasión.',
    price: 40000,
    images: [
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-01_at_17.18.53_vidaf4.jpg',
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777859860/WhatsApp_Image_2026-05-03_at_20.48.27_mz6noi.jpg',
    ],
    celebrantLabel: '¿Nombres de los festejados?',
    icon: '',
  },
  {
    id: 'bautizo',
    name: 'Bautizo',
    description: 'Globos en helio, centros de mesa con velas decoracivas, banner personalizado, individuales y detalles en blanco y dorado.',
    price: 40000,
    images: [
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777860630/WhatsApp_Image_2026-05-03_at_20.48.27_1_dimsec.jpg',
      'https://res.cloudinary.com/dwhbqktyy/image/upload/v1777860631/WhatsApp_Image_2026-05-03_at_20.48.27_2_dlsfbm.jpg',
    ],
    celebrantLabel: '¿Nombre del bautizado/a?',
    icon: '',
  },
];

const PAYMENT_METHODS: { name: string; number: string; logo: string }[] = [
  { name: 'Bre-B', number: '300 635 8466', logo: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1778206897/Bre-B-logo_uxw4ev.png' },
  { name: 'Nequi', number: '310 263 8937', logo: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1778206897/logo_nequi_dlqi2k.png' },
  { name: 'Bancolombia', number: '912 527 354 41', logo: 'https://res.cloudinary.com/dwhbqktyy/image/upload/v1778206897/bancolombia-logo_esct9k.png' },
];

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
];

const STEPS = ['Servicio', 'Fecha y hora', 'Información', 'Confirmación'];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAY_NAMES = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

// ─── Visor de imágenes ──────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) => {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 touch-manipulation">
        <X className="w-5 h-5 text-white" />
      </button>
      <p className="absolute top-5 left-4 text-white/50 text-sm font-medium">
        {idx + 1} / {images.length}
      </p>

      <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <img src={images[idx]} alt={`Foto ${idx + 1}`}
          className="w-full max-h-[80svh] object-contain rounded-2xl" />

        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors touch-manipulation">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors touch-manipulation">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-5 flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
              className={`h-2 rounded-full transition-all touch-manipulation ${i === idx ? 'bg-[#E6B800] w-6' : 'bg-white/40 w-2'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Galería de fotos ─────────────────────────────────────────────────────────
const GalleryStrip = ({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) => (
  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
    <p className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1.5">
      <ZoomIn className="w-3.5 h-3.5" /> Fotos de la decoración — toca para ver en grande
    </p>
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {images.map((src, i) => (
        <button key={i} onClick={() => onOpen(i)}
          className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden group ring-2 ring-transparent hover:ring-[#E6B800] transition-all duration-200 touch-manipulation">
          <img src={src} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 group-active:bg-black/25 transition-colors flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ─── Calendario miniatura ──────────────────────────────────────────────────────
const MiniCalendar = ({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) => {
  const today = new Date();
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const firstDay = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const isDisabled = (day: number) => {
    const d = new Date(view.getFullYear(), view.getMonth(), day); d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0); return d < t;
  };
  const isSelected = (day: number) =>
    !!selected && selected.getDate() === day && selected.getMonth() === view.getMonth() && selected.getFullYear() === view.getFullYear();
  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === view.getMonth() && today.getFullYear() === view.getFullYear();

  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-3 select-none w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white active:bg-gray-200 transition-colors touch-manipulation">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-800 text-sm">{MONTH_NAMES[view.getMonth()]} {view.getFullYear()}</span>
        <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white active:bg-gray-200 transition-colors touch-manipulation">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => <div key={d} className="text-center text-xs text-gray-400 font-semibold py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => (
          <div key={i} className="flex items-center justify-center py-0.5">
            {day === null ? <div className="w-9 h-9" /> : (
              <button
                onClick={() => !isDisabled(day) && onSelect(new Date(view.getFullYear(), view.getMonth(), day))}
                disabled={isDisabled(day)}
                className={[
                  'w-9 h-9 rounded-full text-sm font-medium transition-all duration-150 touch-manipulation',
                  isSelected(day) ? 'bg-[#E6B800] text-white shadow-md' : '',
                  isToday(day) && !isSelected(day) ? 'border-2 border-[#E6B800] text-[#E6B800] font-bold' : '',
                  !isSelected(day) && !isDisabled(day) && !isToday(day) ? 'text-gray-700 hover:bg-[#E6B800]/15 active:bg-[#E6B800]/20' : '',
                  isDisabled(day) ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer',
                ].filter(Boolean).join(' ')}>
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Modal principal ───────────────────────────────────────────────────────────
const ReservationModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [formData, setFormData] = useState<FormData>({ celebrantName: '', reservantName: '', phone: '', guests: 2, notes: '' });
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }); }, [step]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setMounted(true), 15);
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, []);

  const sinDeco = selectedService?.id === 'sin-decoracion';

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) {
      if (sinDeco) return formData.reservantName.trim() !== '';
      return formData.celebrantName.trim() !== '' && formData.reservantName.trim() !== '' && formData.phone.trim() !== '';
    }
    return true;
  };

  const formatDate = (d: Date) => {
    const names = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${names[d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} de ${d.getFullYear()}`;
  };

  const copyNumber = (text: string, key: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopied(key); setTimeout(() => setCopied(null), 2000);
  };

  const openWhatsApp = () => {
    const lines = [
      '¡Hola Maiz Tostao! ', '',
      sinDeco ? 'Quisiera confirmar una reserva de mesa:' : 'Adjunto comprobante de pago para reserva con decoración:', '',
      `Fecha: ${selectedDate ? formatDate(selectedDate) : ''}`,
      `Hora: ${selectedTime}`,
      `Servicio: ${selectedService?.icon} ${selectedService?.name}`,
      ...((!sinDeco && formData.celebrantName) ? [`Celebrado/a: ${formData.celebrantName}`] : []),
      `Reserva a nombre de: ${formData.reservantName}`,
      `Comensales: ${formData.guests}`,
      ...(!sinDeco ? [`Decoración: $${selectedService?.price.toLocaleString('es-CO')} COP`] : []),
      ...(formData.notes?.trim() ? [`Notas: ${formData.notes.trim()}`] : []),
    ];
    window.open(`https://wa.me/573127528524?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  const stepTitles = ['Elige tu decoración', 'Fecha y hora', 'Tus datos', sinDeco ? 'Confirma tu reserva' : 'Confirma y paga'];

  // ── Pasos del formulario ────────────────────────────────────────────────────
  const renderStep = () => {
    // PASO 0 — Selección de servicio
    if (step === 0) return (
      <div className="space-y-3">
        {SERVICES.map(service => {
          const active = selectedService?.id === service.id;
          return (
            <div key={service.id}>
              <button
                onClick={() => setSelectedService(service)}
                className={['w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 touch-manipulation block',
                  active ? 'border-[#E6B800] shadow-md' : 'border-gray-100 hover:border-gray-200',
                ].join(' ')}
              >
                {/* Imagen de portada */}
                <div className="relative h-28 sm:h-32 overflow-hidden">
                  <img src={service.images[0]} alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                    <div>
                      <span className="text-xl">{service.icon}</span>
                      <p className="font-bold text-white text-sm sm:text-base leading-tight mt-0.5">{service.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.images.length > 1 && (
                        <span className="text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {service.images.length} fotos
                        </span>
                      )}
                      <div className={['w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                        active ? 'border-[#E6B800] bg-[#E6B800]' : 'border-white/60 bg-white/10',
                      ].join(' ')}>
                        {active && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Fila de información */}
                <div className={`px-3 py-2.5 flex items-center justify-between gap-2 ${active ? 'bg-[#E6B800]/5' : 'bg-white'}`}>
                  <p className="text-gray-500 text-xs leading-snug line-clamp-1 flex-1">{service.description}</p>
                  <span className={`text-xs font-bold flex-shrink-0 ${active ? 'text-[#E6B800]' : 'text-gray-400'}`}>
                    {service.price === 0 ? 'Sin costo' : `$${service.price.toLocaleString('es-CO')}`}
                  </span>
                </div>
              </button>
              {/* Galería de fotos del servicio seleccionado */}
              {active && service.images.length > 0 && (
                <div className="mt-2">
                  <GalleryStrip images={service.images} onOpen={i => setLightbox({ images: service.images, index: i })} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );

    // PASO 1 — Fecha y hora
    if (step === 1) return (
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#E6B800]" />
            <span className="font-semibold text-gray-800 text-sm">Selecciona la fecha</span>
          </div>
          <MiniCalendar selected={selectedDate} onSelect={d => { setSelectedDate(d); setSelectedTime(null); }} />
        </div>
        {selectedDate && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#E6B800]" />
              <span className="font-semibold text-gray-800 text-sm">Selecciona la hora</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  className={['py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-150 touch-manipulation',
                    selectedTime === t ? 'border-[#E6B800] bg-[#E6B800] text-white shadow-sm' : 'border-gray-100 bg-white text-gray-700 hover:border-[#E6B800]/40 active:bg-gray-50',
                  ].join(' ')}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    // PASO 2 — Información del cliente
    if (step === 2) return (
      <div className="space-y-4">
        {!sinDeco && (
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              <span className="text-[#E6B800]">* </span>{selectedService?.celebrantLabel}
            </span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input type="text" value={formData.celebrantName} placeholder="Nombre completo"
                onChange={e => setFormData(f => ({ ...f, celebrantName: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 transition-colors" />
            </div>
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
            <span className="text-[#E6B800]">* </span>Nombre de quien reserva
          </span>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input type="text" value={formData.reservantName} placeholder="Tu nombre completo"
              onChange={e => setFormData(f => ({ ...f, reservantName: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 transition-colors" />
          </div>
        </label>
        {!sinDeco && (
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              <span className="text-[#E6B800]">* </span>Número de celular
            </span>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input type="tel" value={formData.phone} placeholder="+57 300 000 0000"
                onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 transition-colors" />
            </div>
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
            <span className="text-[#E6B800]">* </span>Número de comensales
          </span>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select value={formData.guests} onChange={e => setFormData(f => ({ ...f, guests: Number(e.target.value) }))}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 appearance-none cursor-pointer transition-colors">
              {Array.from({ length: 19 }, (_, i) => i + 2).map(n => <option key={n} value={n}>{n} personas</option>)}
            </select>
          </div>
        </label>
        {!sinDeco && (
          <label className="block">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Notas adicionales (opcional)</span>
            <textarea value={formData.notes} rows={3} placeholder="Alergias, peticiones especiales..."
              onChange={e => setFormData(f => ({ ...f, notes: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#E6B800] bg-gray-50 resize-none transition-colors" />
          </label>
        )}
      </div>
    );

    // PASO 3 — Confirmación y pago
    if (step === 3) return (
      <div className="space-y-4">
        <div className="rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(135deg,#1a1a1a,#2d1a00)' }}>
          <p className="text-[#E6B800] text-xs font-bold uppercase tracking-widest mb-3">Resumen de tu reserva</p>
          <div className="space-y-2">
            {[
              { label: sinDeco ? 'Tipo' : 'Decoración', value: `${selectedService?.icon} ${selectedService?.name}` },
              { label: 'Fecha', value: selectedDate ? formatDate(selectedDate) : '', small: true },
              { label: 'Hora', value: selectedTime ?? '' },
              ...(!sinDeco && formData.celebrantName ? [{ label: 'Celebrado/a', value: formData.celebrantName }] : []),
              { label: 'Reserva a nombre de', value: formData.reservantName },
              { label: 'Comensales', value: `${formData.guests} personas` },
            ].map(({ label, value, small }) => (
              <div key={label} className="flex justify-between items-start gap-3">
                <span className="text-white/60 text-xs flex-shrink-0">{label}</span>
                <span className={`font-medium text-right ${small ? 'text-xs' : 'text-sm'}`}>{value}</span>
              </div>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm font-semibold">Costo decoración</span>
              <span className="text-[#E6B800] font-bold text-base">
                {sinDeco ? 'Sin costo' : `$${selectedService?.price.toLocaleString('es-CO')} COP`}
              </span>
            </div>
          </div>
        </div>

        {sinDeco ? (
          <>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-green-800 text-xs font-semibold mb-1">✅ ¡Sin costo adicional!</p>
              <p className="text-green-700 text-xs leading-relaxed">Esta reserva no requiere pago anticipado. Envíanos tus datos por WhatsApp y te confirmamos tu mesa.</p>
            </div>
            <WAButton label="Confirmar reserva por WhatsApp" onClick={openWhatsApp} />
            <p className="text-center text-xs text-gray-400">Te responderemos confirmando la disponibilidad.</p>
          </>
        ) : (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-amber-800 text-xs font-semibold mb-1">⚠️ Pago anticipado requerido</p>
              <p className="text-amber-700 text-xs leading-relaxed">Para garantizar tu reserva realiza el pago de la decoración y envíanos el comprobante por WhatsApp.</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Métodos de pago</p>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={m.logo} alt={m.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                        <p className="text-gray-500 text-xs font-mono">{m.number}</p>
                      </div>
                    </div>
                    <button onClick={() => copyNumber(m.number, m.number + idx)}
                      className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-[#E6B800] p-2 rounded-lg hover:bg-[#E6B800]/10 transition-colors touch-manipulation">
                      {copied === m.number + idx
                        ? <><CheckCircle className="w-4 h-4 text-green-500" /><span className="hidden sm:inline ml-1">Copiado</span></>
                        : <><Copy className="w-4 h-4" /><span className="hidden sm:inline ml-1">Copiar</span></>
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <WAButton label="Enviar comprobante por WhatsApp" onClick={openWhatsApp} />
            <p className="text-center text-xs text-gray-400">Una vez recibido el comprobante confirmamos tu reserva.</p>
          </>
        )}
      </div>
    );
  };

  // ─── Estructura visual del modal ───────────────────────────────────────────
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 transition-all duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <div className={[
          'relative bg-white flex flex-col overflow-hidden shadow-2xl',
          'w-full rounded-t-3xl sm:rounded-3xl',
          'max-h-[93svh] sm:max-h-[88vh] sm:max-w-2xl',
          'transition-all duration-300',
          mounted ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-10 opacity-0 sm:scale-95',
        ].join(' ')}>

          {/* Indicador de arrastre — solo en móvil */}
          <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Barra lateral — solo en escritorio */}
            <div className="hidden sm:flex w-44 flex-shrink-0 flex-col"
              style={{ background: 'linear-gradient(160deg,#1a1a1a 0%,#2d1a00 100%)' }}>
              <div className="p-5 border-b border-white/10 flex-shrink-0">
                <img src="https://res.cloudinary.com/dwhbqktyy/image/upload/v1777004528/logo_y57zko.png"
                  alt="Maiz Tostao" className="w-12 h-12 object-contain mb-2" />
                <p className="text-white font-bold text-sm">Maiz Tostao</p>
                <p className="text-white/40 text-xs">Restaurante</p>
              </div>
              <div className="flex-1 p-4 space-y-1">
                {STEPS.map((label, i) => {
                  const done = i < step; const active = i === step;
                  return (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className={['w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all',
                        done ? 'bg-[#E6B800] text-white' : active ? 'bg-white text-gray-900' : 'bg-white/10 text-white/30',
                      ].join(' ')}>
                        {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className={['text-xs font-medium', active ? 'text-[#E6B800]' : done ? 'text-white/70' : 'text-white/30'].join(' ')}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 border-t border-white/10 flex-shrink-0">
                <p className="text-white/40 text-xs mb-1">¿Tienes preguntas?</p>
                <a href="https://wa.me/573127528524" target="_blank" rel="noopener noreferrer"
                  className="text-[#E6B800] text-xs font-medium hover:underline">+57 312 752 8524</a>
              </div>
            </div>

            {/* Área de contenido */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              {/* Indicador de progreso — solo en móvil */}
              <div className="sm:hidden flex items-center justify-center gap-1.5 px-4 py-2 flex-shrink-0">
                {STEPS.map((_, i) => (
                  <div key={i} className={['h-1.5 rounded-full transition-all duration-300',
                    i === step ? 'bg-[#E6B800] w-7' : i < step ? 'bg-[#E6B800]/50 w-4' : 'bg-gray-200 w-4',
                  ].join(' ')} />
                ))}
              </div>

              {/* Cabecera del modal */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/80 flex-shrink-0">
                <div className="min-w-0 pr-2">
                  <p className="hidden sm:block text-xs text-gray-400 font-medium uppercase tracking-wide">Paso {step + 1} de {STEPS.length}</p>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight truncate">{stepTitles[step]}</h3>
                </div>
                <button onClick={onClose}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0 touch-manipulation">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Cuerpo del modal */}
              <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4">
                {renderStep()}
              </div>

              {/* Pie del modal */}
              <div className="px-4 sm:px-5 py-3 border-t border-gray-100 bg-white flex items-center justify-between gap-3 flex-shrink-0">
                {step > 0 ? (
                  <button onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-400 active:bg-gray-50 transition-colors touch-manipulation">
                    <ChevronLeft className="w-4 h-4" /> Atrás
                  </button>
                ) : <div />}

                {step < STEPS.length - 1 ? (
                  <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()}
                    className={['flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 touch-manipulation',
                      canNext() ? 'bg-[#E6B800] hover:bg-[#D4A000] active:bg-[#C49000] text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed',
                    ].join(' ')}>
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={onClose}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 transition-colors shadow-md touch-manipulation">
                    <Check className="w-4 h-4" /> Finalizar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  );
};

// ─── Botón de WhatsApp ─────────────────────────────────────────────────────────
const WAButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 touch-manipulation"
    style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
    <MessageCircle className="w-5 h-5" />
    {label}
  </button>
);

export default ReservationModal;
