import { useState } from "react";
import { Phone } from "lucide-react";
import mascot from "@/assets/mascot-utilitop.png";
import { useLanguage } from "@/i18n/LanguageContext";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-14">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">{t("faq.title")}</h2>
            <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed">
              {t("faq.subtitle")}
            </p>
          </div>
          <img src={mascot} alt="Mascotte UTILITOP" className="w-36 h-36 object-contain hidden sm:block transition-transform duration-300 hover:-rotate-6 hover:scale-110 cursor-pointer" />
        </div>

        <div className="grid gap-3 max-w-3xl">
          {faqKeys.map((key, i) => {
            const q = t(`${key}.q`);
            if (q === `${key}.q`) return null;
            return (
              <details
                key={key}
                open={open === i}
                onClick={(e) => { e.preventDefault(); setOpen(open === i ? null : i); }}
                className="glass-card-flat p-4 rounded-md cursor-pointer"
              >
                <summary className="font-bold text-foreground">{q}</summary>
                {open === i && <p className="text-muted-foreground mt-2.5 leading-relaxed text-sm">{t(`${key}.a`)}</p>}
              </details>
            );
          })}
        </div>

        <div className="flex gap-2.5 flex-wrap items-center justify-center mt-6">
          <a href="#devis" className="btn-primary text-sm">{t("faq.cta")}</a>
          <a href="tel:+32491507960" className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-6 py-3 rounded-xl transition-colors shadow-lg"><Phone className="w-5 h-5" /> +32 491 50 79 60</a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
