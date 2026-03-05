import Header from "@/components/Header";
import PacksSection from "@/components/PacksSection";
import LiftSection from "@/components/LiftSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Packs = () => (
  <LanguageProvider>
    <div className="min-h-screen">
      <Header />
      <main>
        <PacksSection />
        <LiftSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </LanguageProvider>
);

export default Packs;
