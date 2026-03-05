import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageContext";

const About = () => (
  <LanguageProvider>
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </LanguageProvider>
);

export default About;
