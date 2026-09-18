/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { FloatingCallButton } from './components/common/FloatingCallButton';
import { ChatSupport } from './components/common/ChatSupport';
import { MaintenanceTipsSidebar } from './components/common/MaintenanceTipsSidebar';
import { EmergencyTips } from './components/common/EmergencyTips';
import { GoogleReviewsSync } from './components/common/GoogleReviewsSync';
import { WhyChooseUs } from './components/common/WhyChooseUs';
import { ServiceSection } from './components/common/ServiceSection';
import { WorkProcess } from './components/common/WorkProcess';
import { PricingSection } from './components/common/PricingSection';
import { PortfolioSection } from './components/common/PortfolioSection';
import { TestimonialSection } from './components/common/TestimonialSection';
import { FAQSection } from './components/common/FAQSection';
import { AreaCoverage } from './components/common/AreaCoverage';
import { ArticleSection } from './components/common/ArticleSection';
import { ContactForm } from './components/common/ContactForm';
import { NewsletterModal } from './components/common/NewsletterModal';
import { ContentOptimizer } from './components/dev/ContentOptimizer';
import { WebVitalsOverlay } from './components/dev/WebVitalsOverlay';
import { Breadcrumb } from './components/common/Breadcrumb';
import { LocalBusinessSchema } from './components/schema/LocalBusinessSchema';
import { BUSINESS_NAME } from './data/config';
import { usePageMetadata } from './hooks/usePageMetadata';

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
      <main id="main-content" className="flex-grow">
        <Breadcrumb items={[{ label: 'Beranda' }]} />
        <section className="py-20 bg-blue-50 dark:bg-gray-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300 mb-6 transition-colors">
              Jasa Sedot WC Murah di Sukabumi
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto transition-colors">
              Layanan profesional penyedotan WC, septic tank, dan perawatan saluran mampet.
              Respon cepat dan pengerjaan tuntas untuk area Sukabumi.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/kontak" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Hubungi Sekarang</a>
              <a href="/layanan" className="px-6 py-3 bg-white dark:bg-gray-700 text-blue-900 dark:text-white rounded-lg font-semibold border border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">Lihat Layanan</a>
            </div>
          </div>
        </section>
        <WhyChooseUs />
        <ServiceSection />
        <EmergencyTips />
        <GoogleReviewsSync />
        <WorkProcess />
        <PricingSection />
        <PortfolioSection />
        <TestimonialSection />
        <FAQSection />
        <AreaCoverage />
        <ArticleSection />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingCallButton />
      <ChatSupport />
      <MaintenanceTipsSidebar />
      <NewsletterModal />
      <WebVitalsOverlay />
      {import.meta.env.MODE === 'development' && <ContentOptimizer />}
    </div>
  );
}
