import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import GallerySection from '@/components/landing/GallerySection';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <GallerySection />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}