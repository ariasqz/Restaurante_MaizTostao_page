'use client';

import { useState, useEffect } from 'react';

/**
 * Devuelve `true` únicamente después de que React haya hidratado el DOM en el cliente.
 * En el servidor (SSR) siempre devuelve `false`, lo que permite renderizar
 * el contenido visible sin clases de animación.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
