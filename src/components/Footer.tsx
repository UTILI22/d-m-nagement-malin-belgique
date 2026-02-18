import logo from "@/assets/logo-utilitop.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="pt-8 pb-11 border-t border-foreground/[0.08]" style={{ background: "linear-gradient(180deg, rgba(5,20,17,.2), rgba(5,20,17,.6))" }}>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-[1.2fr_.8fr_.8fr] gap-8 items-start">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src={logo} alt="UTILITOP" className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <div className="font-black tracking-wide text-sm text-foreground">UTILITOP</div>
                <div className="text-xs text-muted-foreground">Déménagement & Transport</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.desc")}</p>
            <p className="text-xs text-foreground/40 mt-2.5">© {new Date().getFullYear()} UTILITOP — {t("footer.rights")}</p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">{t("footer.contact")}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📞 <a href="tel:+32491507960" className="hover:text-foreground transition-colors">+32 491 50 79 60</a></p>
              <p>💬 <a href="https://wa.me/32491507960" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a></p>
              <p>🌐 utilitop.be</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-3 text-sm">{t("footer.links")}</h4>
            <div className="space-y-2 text-sm">
              <p><a href="#packs" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.packs")}</a></p>
              <p><a href="#comment-ca-marche" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.how")}</a></p>
              <p><a href="#avis" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.reviews")}</a></p>
              <p><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">{t("nav.faq")}</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
