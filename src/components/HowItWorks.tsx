import { useLanguage } from "@/i18n/LanguageContext";

const steps = ["1", "2", "3"];

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="comment-ca-marche" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">{t("how.title")}</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">{t("how.subtitle")}</p>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((num) => (
            <div key={num} className="glass-card-flat p-5 rounded-lg">
              <div className="w-[34px] h-[34px] rounded-xl grid place-items-center font-black text-foreground mb-2.5" style={{ background: "rgba(32,201,151,.12)", border: "1px solid rgba(32,201,151,.20)" }}>
                {num}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{t(`step${num}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`step${num}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 flex-wrap mt-6">
          <a href="#devis" className="btn-primary text-sm">{t("how.cta")}</a>
          <a href="tel:+32491507960" className="btn-glass text-sm">📞 +32 491 50 79 60</a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
