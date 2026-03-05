import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import mascot from "@/assets/mascot-utilitop.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

const langs: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "nl", label: "NL" },
  { code: "en", label: "EN" },
];

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-foreground/[0.08]" style={{ background: "linear-gradient(180deg, rgba(7,27,22,.85), rgba(7,27,22,.65))" }}>
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
          <img src={mascot} alt="UTILITOP" className="w-10 h-10 md:w-[52px] md:h-[52px] rounded-xl object-contain" />
          <div className="hidden sm:block">
            <div className="font-black tracking-wide text-sm text-foreground">UTILITOP</div>
            <div className="text-xs text-muted-foreground">Déménagement & Transport</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/packs" className="bg-primary/15 text-primary font-bold text-sm px-3.5 py-2 rounded-xl border border-primary/30 hover:bg-primary/25 transition-colors animate-pulse">{t("nav.packs")}</Link>
          <a href="/#comment-ca-marche" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.how")}</a>
          <Link to="/a-propos" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.about")}</Link>
          <a href="/#faq" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">{t("nav.faq")}</a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language switcher */}
          <div className="flex items-center rounded-lg border border-foreground/10 overflow-hidden">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 text-[11px] font-bold transition-colors ${
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop only: Obtenir un devis */}
          <Link to="/#devis" className="btn-primary text-xs hidden md:inline-flex">{t("nav.quote")}</Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-foreground hover:bg-foreground/10 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-foreground/[0.08] animate-fade-in" style={{ background: "rgba(7,27,22,.95)" }}>
          <nav className="container mx-auto py-5 px-4 flex flex-col gap-0.5">
            <Link to="/" onClick={closeMobile} className="text-foreground font-bold text-sm py-3 px-4 rounded-xl hover:bg-foreground/[0.06] transition-colors uppercase tracking-wider">
              {t("nav.home")}
            </Link>
            <Link to="/packs" onClick={closeMobile} className="text-primary font-bold text-sm py-3 px-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors uppercase tracking-wider">
              ⭐ {t("nav.packs")}
            </Link>
            <Link to="/a-propos" onClick={closeMobile} className="text-muted-foreground font-semibold text-sm py-3 px-4 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors uppercase tracking-wider">
              {t("nav.about")}
            </Link>
            <a href="/#faq" onClick={closeMobile} className="text-muted-foreground font-semibold text-sm py-3 px-4 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors uppercase tracking-wider">
              {t("nav.faq")}
            </a>
            <a href="tel:+32491507960" onClick={closeMobile} className="text-muted-foreground font-semibold text-sm py-3 px-4 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" /> Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
