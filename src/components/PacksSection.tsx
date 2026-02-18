import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

const packs = [
  { key: "pack1", icon: "🚚", popular: false },
  { key: "pack2", icon: "📦", popular: true },
  { key: "pack3", icon: "⭐", popular: false },
  { key: "pack4", icon: "🎯", popular: false },
];

const PacksSection = () => {
  const { t } = useLanguage();

  const handleWhatsApp = (packName: string) => {
    const msg = encodeURIComponent(`Bonjour, je suis intéressé par le ${packName}. Pouvez-vous me faire un devis ?`);
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  return (
    <section id="packs" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">{t("packs.title")}</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          {t("packs.subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packs.map((p) => (
            <div key={p.key} className="glass-card-flat p-5 rounded-lg relative flex flex-col">
              {p.popular && (
                <span className="absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ background: "linear-gradient(180deg, hsl(46 95% 66%), hsl(46 89% 54%))" }}>
                  ⭐ Populaire
                </span>
              )}
              <div className="text-2xl mb-3">{p.icon}</div>
              <h3 className="text-base font-bold text-foreground mb-1">{t(`${p.key}.name`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{t(`${p.key}.desc`)}</p>
              <p className="text-primary font-bold text-sm mb-3">{t(`${p.key}.price`)}</p>
              <button
                onClick={() => handleWhatsApp(t(`${p.key}.name`))}
                className="btn-glass text-sm w-full"
              >
                {t("packs.cta")} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PacksSection;
