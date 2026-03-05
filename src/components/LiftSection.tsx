import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, MessageCircle } from "lucide-react";
import liftServiceImg from "@/assets/lift-service.jpg";
import liftCamionImg from "@/assets/lift-camion.jpg";
import liftMaindoeuvreImg from "@/assets/lift-maindoeuvre.jpg";

const liftCards = [
  { key: "lift1", image: liftServiceImg, popular: false },
  { key: "lift2", image: liftCamionImg, popular: true },
  { key: "lift3", image: liftMaindoeuvreImg, popular: false },
];

const LiftSection = () => {
  const { t } = useLanguage();

  const handleQuote = () => {
    const msg = encodeURIComponent(t("lift.whatsapp_msg"));
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  const handleContact = () => {
    window.open("https://wa.me/32491507960", "_blank");
  };

  return (
    <section id="lift" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">
          {t("lift.title")}
        </h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          {t("lift.subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {liftCards.map((card) => (
            <div
              key={card.key}
              className={`group rounded-2xl overflow-hidden relative flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                card.popular
                  ? "ring-2 ring-primary shadow-[0_0_30px_rgba(243,198,34,.15)]"
                  : "border border-foreground/[0.08]"
              }`}
              style={{
                background: "linear-gradient(180deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.03))",
              }}
            >
              {card.popular && (
                <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ background: "linear-gradient(180deg, hsl(46 95% 66%), hsl(46 89% 54%))" }}>
                  ⭐ Populaire
                </span>
              )}

              <div className="relative h-56 overflow-hidden">
                <img src={card.image} alt={t(`${card.key}.name`)} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-extrabold text-foreground mb-5">
                  {t(`${card.key}.name`)}
                </h3>

                {/* Price block */}
                <div className="mb-4">
                  <p className="text-4xl font-black text-foreground leading-tight">
                    {t(`${card.key}.price_main`)}
                  </p>
                  <p className="text-base font-bold text-foreground/80">
                    {t(`${card.key}.price_sub`)}
                  </p>
                </div>

                {/* Secondary price if exists */}
                {t(`${card.key}.price2_main`) !== `${card.key}.price2_main` && (
                  <div className="mb-4">
                    <p className="text-2xl font-extrabold text-foreground leading-tight">
                      {t(`${card.key}.price2_main`)}
                    </p>
                    <p className="text-sm font-semibold text-foreground/70">
                      {t(`${card.key}.price2_sub`)}
                    </p>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 italic">
                  {t(`${card.key}.desc`)}
                </p>

                {/* Extra notes */}
                {[1, 2].map((i) => {
                  const noteKey = `${card.key}.note${i}`;
                  const noteText = t(noteKey);
                  if (noteText === noteKey) return null;
                  return (
                    <p key={i} className="text-xs text-foreground/70 font-semibold mb-1.5">
                      {noteText}
                    </p>
                  );
                })}

                {/* CTA */}
                <button
                  onClick={card.key === "lift3" ? handleContact : handleQuote}
                  className={`${card.popular ? "btn-primary" : "btn-glass"} text-sm w-full mt-4`}
                >
                  {t(`${card.key}.cta`)} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiftSection;
