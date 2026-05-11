'use client';

import { useEffect } from 'react';

// Oculta el loader una vez que React hidrata y la página está lista
export default function PageLoader() {
  useEffect(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, []);

  return null;
}
