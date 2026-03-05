import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Check } from "lucide-react";
import packTransport from "@/assets/pack-transport.jpg";
import packDemenagement from "@/assets/pack-demenagement.jpg";
import packPremium from "@/assets/pack-premium.jpg";
import packCustom from "@/assets/pack-custom.jpg";

const packs = [
  { key: "pack1", image: packTransport, popular: false, features: 3 },
  { key: "pack2", image: packDemenagement, popular: true, features: 4 },
  { key: "pack3", image: packPremium, popular: false, features: 5 },
  { key: "pack4", image: packCustom, popular: false, features: 3 },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packs.map((p) => (
            <div
              key={p.key}
              className={`group rounded-2xl overflow-hidden relative flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                p.popular
                  ? "ring-2 ring-primary shadow-[0_0_30px_rgba(243,198,34,.15)]"
                  : "border border-foreground/[0.08]"
              }`}
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
            >
              {p.popular && (
                <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ background: "linear-gradient(180deg, hsl(46 95% 66%), hsl(46 89% 54%))" }}>
                  ⭐ Populaire
                </span>
              )}

              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={p.image}
                  alt={t(`${p.key}.name`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{t(`${p.key}.name`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t(`${p.key}.desc`)}</p>

                {/* Features list */}
                <ul className="space-y-1.5 mb-4">
                  {Array.from({ length: p.features }).map((_, i) => {
                    const featureKey = `${p.key}.feature${i + 1}`;
                    const featureText = t(featureKey);
                    if (featureText === featureKey) return null;
                    return (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        {featureText}
                      </li>
                    );
                  })}
                </ul>

                <p className="text-primary font-extrabold text-base mb-3">{t(`${p.key}.price`)}</p>

                <button
                  onClick={() => handleWhatsApp(t(`${p.key}.name`))}
                  className={`${p.popular ? "btn-primary" : "btn-glass"} text-sm w-full`}
                >
                  {t("packs.cta")} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PacksSection;
