import { useLanguage } from "@/i18n/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    { key: "review1", stars: "★★★★★" },
    { key: "review2", stars: "★★★★★" },
  ];

  return (
    <section id="avis" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">{t("reviews.title")}</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">{t("reviews.subtitle")}</p>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((r) => (
            <div key={r.key} className="glass-card-flat p-5 rounded-lg">
              <p className="text-primary tracking-widest mb-2.5">{r.stars}</p>
              <p className="text-muted-foreground leading-relaxed mb-2.5">{t(`${r.key}.text`)}</p>
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-foreground font-semibold text-sm">{t(`${r.key}.name`)}</span>
                <span className="text-muted-foreground text-xs">{t(`${r.key}.type`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
