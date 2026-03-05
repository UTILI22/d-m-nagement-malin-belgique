import Header from "@/components/Header";
import PackSelector from "@/components/PackSelector";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Devis = () => (
  <LanguageProvider>
    <div className="min-h-screen">
      <Header />
      <main>
        <PackSelector />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </LanguageProvider>
);

export default Devis;
