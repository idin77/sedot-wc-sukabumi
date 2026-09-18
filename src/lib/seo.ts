export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Sedot WC Sukabumi | Jasa Sedot WC Profesional',
    description: 'Jasa sedot WC, septic tank, dan perawatan saluran mampet profesional di wilayah Sukabumi, Jawa Barat. Solusi cepat dan terpercaya.',
    keywords: ['sedot wc sukabumi', 'jasa sedot wc', 'sedot septic tank', 'wc mampet sukabumi', 'layanan wc']
  },
  '/layanan/sedot-wc': {
    title: 'Layanan Sedot WC & Septic Tank | Sedot WC Sukabumi',
    description: 'Layanan sedot WC dan pengurasan septic tank profesional di Sukabumi. Cepat, bersih, dan bergaransi.',
    keywords: ['sedot wc', 'pengurasan septic tank', 'sedot wc sukabumi']
  },
  '/layanan/wc-mampet': {
    title: 'Jasa Perbaikan WC Mampet | Sedot WC Sukabumi',
    description: 'Solusi cepat untuk perbaikan WC mampet dan saluran air tersumbat di Sukabumi tanpa bongkar.',
    keywords: ['wc mampet', 'perbaikan wc', 'saluran tersumbat', 'sedot wc sukabumi']
  }
};
