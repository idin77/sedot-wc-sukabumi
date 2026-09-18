import React from 'react';
import { BUSINESS_NAME, ADDRESS, HOURS, WHATSAPP_NUMBER } from '@/src/data/config';

export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_NAME,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ADDRESS,
      "addressLocality": "Sukabumi",
      "addressRegion": "Jawa Barat",
      "addressCountry": "ID"
    },
    "telephone": WHATSAPP_NUMBER,
    "openingHours": HOURS
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
