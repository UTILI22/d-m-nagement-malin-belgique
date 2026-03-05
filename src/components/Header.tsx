import { Phone } from "lucide-react";
import logo from "@/assets/logo-utilitop.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

const langs: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "nl", label: "NL" },
  { code: "en", label: "EN" },
];

const Header = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-foreground/[0.08]" style={{ background: "linear-gradient(180deg, rgba(7,27,22,.85), rgba(7,27,22,.65))" }}>
      <div className="container mx-auto flex items-center justify-between py-3.5 gap-3.5">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="UTILITOP" className="w-[42px] h-[42px] rounded-xl object-cover" />
          <div>
            <div className="font-black tracking-wide text-sm text-foreground">UTILITOP</div>
            <div className="text-xs text-muted-foreground">Déménagement & Transport</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <a href="#packs" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.packs")}</a>
          <a href="#comment-ca-marche" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.how")}</a>
          <a href="#a-propos" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.about")}</a>
          <a href="#avis" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.reviews")}</a>
          <a href="#faq" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.faq")}</a>
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language switcher */}
          <div className="flex items-center rounded-xl border border-foreground/10 overflow-hidden">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a href="tel:+32491507960" className="md:hidden glass-card-flat px-3 py-2.5 rounded-[14px] text-muted-foreground font-bold text-sm flex items-center gap-2">
            <Phone className="w-4 h-4" /> +32 491 50 79 60
          </a>
          <a href="#devis" className="btn-primary text-sm hidden sm:inline-flex">{t("nav.quote")}</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
