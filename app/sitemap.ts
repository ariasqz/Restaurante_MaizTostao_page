import type { MetadataRoute } from 'next';

// Next.js genera /sitemap.xml automáticamente a partir de este archivo
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://maiztostao.com.co',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
