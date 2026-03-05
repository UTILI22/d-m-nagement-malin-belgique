import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, Clock, Truck, Users } from "lucide-react";

const AboutSection = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Shield, key: "1" },
    { icon: Clock, key: "2" },
    { icon: Truck, key: "3" },
    { icon: Users, key: "4" },
  ];

  return (
    <section id="a-propos" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">
          {t("about.title")}
        </h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-4 max-w-2xl">
          {t("about.intro")}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-2xl">
          {t("about.story")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(({ icon: Icon, key }) => (
            <div key={key} className="glass-card-flat p-5 rounded-lg">
              <div
                className="w-[34px] h-[34px] rounded-xl grid place-items-center mb-2.5"
                style={{ background: "rgba(243,198,34,.12)", border: "1px solid rgba(243,198,34,.20)" }}
              >
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{t(`about.value${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.value${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 flex-wrap mt-6">
          <a href="#devis" className="btn-primary text-sm">{t("about.cta")}</a>
          <a href="tel:+32491507960" className="btn-glass text-sm">📞 +32 491 50 79 60</a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
