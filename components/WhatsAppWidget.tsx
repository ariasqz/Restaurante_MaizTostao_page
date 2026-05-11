'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = '573127528524';
  const message = encodeURIComponent('¡Hola Maíz Tostao! 🌽 Quisiera obtener más información.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Tarjeta del chat */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 overflow-hidden">

          {/* Cabecera verde */}
          <div className="bg-[#25D366] px-4 py-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  Comenzar una conversación
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  ¡Hola! Haz clic en el botón de abajo para chatear por{' '}
                  <strong className="text-white">WhatsApp</strong>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors ml-2 mt-0.5 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="bg-gray-50 px-4 py-3">
            <p className="text-gray-400 text-xs mb-3">
              El equipo suele responder en unos minutos.
            </p>

            {/* Contacto */}
            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">Maíz Tostao</p>
                <p className="text-gray-400 text-xs">Restaurante</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
            </a>

            {/* Pie */}
            <p className="text-center text-gray-300 text-xs mt-3">
              powered by WhatsApp
            </p>
          </div>

        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        aria-label="Abrir chat de WhatsApp"
      >
        {isOpen
          ? <X className="w-6 h-6 text-white" />
          : <MessageCircle className="w-7 h-7 text-white" />
        }
      </button>

    </div>
  );
};

export default WhatsAppWidget;