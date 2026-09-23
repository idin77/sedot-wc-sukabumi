/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { SocialProofToast } from './components/common/SocialProofToast';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SEOHistoryLogger } from './components/dev/SEOHistoryLogger';
import { AutoReplyWhatsApp } from './components/dev/AutoReplyWhatsApp';
import { AccessibilityReport } from './components/dev/AccessibilityReport';
import { WhatsAppKeywordAnalytics } from './components/dev/WhatsAppKeywordAnalytics';
import { WhatsAppBotSimulator } from './components/common/WhatsAppBotSimulator';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { FloatingShareButton } from './components/common/FloatingShareButton';
import { FloatingCallButton } from './components/common/FloatingCallButton';
import { ChatSupport } from './components/common/ChatSupport';
import { MaintenanceTipsSidebar } from './components/common/MaintenanceTipsSidebar';
import { EmergencyTips } from './components/common/EmergencyTips';
import { GoogleReviewsSync } from './components/common/GoogleReviewsSync';
import { WhyChooseUs } from './components/common/WhyChooseUs';
import { TechnicianProfile } from './components/common/TechnicianProfile';
import { ServiceSection } from './components/common/ServiceSection';
import { WorkProcess } from './components/common/WorkProcess';
import { PricingSection } from './components/common/PricingSection';
import { ServicePerformanceTracker } from './components/common/ServicePerformanceTracker';
import { ServiceNewsSection } from './components/common/ServiceNewsSection';
import { ServiceNewsletterSignup } from './components/common/ServiceNewsletterSignup';
import { TestimonialSection } from './components/common/TestimonialSection';
import { FAQSection } from './components/common/FAQSection';
import { AreaCoverage } from './components/common/AreaCoverage';
import { ContactForm } from './components/common/ContactForm';
import { ServiceScheduler } from './components/common/ServiceScheduler';
import { NewsletterModal } from './components/common/NewsletterModal';
import { ContentOptimizer } from './components/dev/ContentOptimizer';
import { WebVitalsOverlay } from './components/dev/WebVitalsOverlay';
import { MetaTagEditor } from './components/common/MetaTagEditor';
import { Breadcrumb } from './components/common/Breadcrumb';
import { LocalBusinessSchema } from './components/schema/LocalBusinessSchema';
import { BUSINESS_NAME, WHATSAPP_NUMBER } from './data/config';
import { usePageMetadata } from './hooks/usePageMetadata';

const ProjectGallery = lazy(() => import('./components/common/ProjectGallery').then(module => ({ default: module.ProjectGallery })));
const ArticleSection = lazy(() => import('./components/common/ArticleSection').then(module => ({ default: module.ArticleSection })));

export default function App() {
  usePageMetadata({
    title: `Jasa Sedot WC Profesional di Sukabumi - ${BUSINESS_NAME}`,
    description: 'Layanan profesional penyedotan WC, septic tank, dan perawatan saluran mampet di Sukabumi. Respon cepat, harga transparan, dan pengerjaan tuntas.',
  });

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-b-lg"
      >
        Skip to main content
      </a>
      <LocalBusinessSchema />
      <Header />
      <SocialProofToast />
      <main id="main-content" className="flex-grow">
        <Breadcrumb items={[{ label: 'Beranda' }]} />
        <section className="py-20 bg-blue-50 dark:bg-gray-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300 mb-6 transition-colors">
              Jasa Sedot WC Sukabumi Terpercaya - Cepat & Murah
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto transition-colors">
              Kami menyediakan layanan jasa sedot wc sukabumi profesional. Solusi sedot septic tank sukabumi, sedot tinja sukabumi, dan sedot wc panggilan sukabumi yang aktif 24 jam. Dapatkan jasa sedot tinja murah sukabumi dengan layanan sedot wc cepat datang sukabumi ke lokasi Anda.
            </p>
            <div className="flex gap-4 justify-center">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Hubungi Sekarang</a>
              <a href="#main-content" className="px-6 py-3 bg-white dark:bg-gray-700 text-blue-900 dark:text-white rounded-lg font-semibold border border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">Lihat Layanan</a>
            </div>
          </div>
        </section>
        <WhyChooseUs />
        <TechnicianProfile />
        <ServiceSection />
        <EmergencyTips />
        <GoogleReviewsSync />
        <WorkProcess />
        <PricingSection />
        <ServicePerformanceTracker />
        <ServiceNewsSection />
        <ServiceNewsletterSignup />
        <Suspense fallback={<div className="py-16 text-center">Memuat Galeri...</div>}>
          <ProjectGallery />
        </Suspense>
        <TestimonialSection />
        <FAQSection />
        <AreaCoverage />
        <Suspense fallback={<div className="py-16 text-center">Memuat Artikel...</div>}>
          <ArticleSection />
        </Suspense>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <ContactForm />
            <ServiceScheduler />
          </div>
        </div>
      </main>
      <Footer />
      <div className="no-print">
        <SEOHistoryLogger />
        <AutoReplyWhatsApp />
        <AccessibilityReport />
        <WhatsAppKeywordAnalytics />
        <WhatsAppBotSimulator />
        <WhatsAppButton />
        <FloatingCallButton />
        <FloatingShareButton />
        <ChatSupport />
        <MaintenanceTipsSidebar />
        <NewsletterModal />
        <WebVitalsOverlay />
        <MetaTagEditor />
        {import.meta.env.MODE === 'development' && <ContentOptimizer />}
      </div>
    </div>
  );
}
