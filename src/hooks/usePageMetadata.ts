import { useEffect } from 'react';

interface Metadata {
  title: string;
  description: string;
}

/**
 * Custom hook to dynamically update page title, meta description, 
 * and OpenGraph tags based on current view/route.
 */
export const usePageMetadata = ({ title, description }: Metadata) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // 3. Update OG:Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // 4. Update OG:Description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [title, description]);
};
