import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PacksSection from "@/components/PacksSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <PacksSection />
          <HowItWorks />
          <TestimonialsSection />
          <FAQSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
