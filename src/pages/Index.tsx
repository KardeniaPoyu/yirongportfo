import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutPreview from '@/components/AboutPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background noise-overlay">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <AboutPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;