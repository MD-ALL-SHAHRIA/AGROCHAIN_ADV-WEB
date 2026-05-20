import PublicNavbar from '@/components/home/PublicNavbar';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedCrops from '@/components/home/FeaturedCrops';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToAction from '@/components/home/CallToAction';
import PublicFooter from '@/components/home/PublicFooter';

export default function HomePage() {
  return (
 
    <div className="min-h-screen bg-[#fafafa] selection:bg-green-500 selection:text-white font-sans overflow-x-hidden">
      <PublicNavbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedCrops />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <CallToAction />
      </main>
      <PublicFooter />
    </div>
  );
}