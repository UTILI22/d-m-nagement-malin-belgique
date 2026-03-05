import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, MessageCircle } from "lucide-react";

const liftCards = [
  { key: "lift1", accent: true },
  { key: "lift2", accent: false },
  { key: "lift3", accent: false },
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
              className="group rounded-2xl overflow-hidden relative flex flex-col border border-foreground/[0.08] transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(180deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.03))",
              }}
            >
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
                  className="btn-primary text-sm w-full mt-4"
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
