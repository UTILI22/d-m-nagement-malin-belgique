import { Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-foreground/[0.08]" style={{ background: "linear-gradient(180deg, rgba(7,27,22,.85), rgba(7,27,22,.65))" }}>
      <div className="container mx-auto flex items-center justify-between py-3.5 gap-3.5">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] rounded-xl grid place-items-center font-black text-primary-foreground" style={{ background: "radial-gradient(14px 14px at 30% 30%, rgba(255,255,255,.22), transparent 60%), linear-gradient(180deg, rgba(255,212,84,.95), rgba(243,198,34,.85))", boxShadow: "0 10px 22px rgba(243,198,34,.14)" }}>
            U
          </div>
          <div>
            <div className="font-black tracking-wide text-sm text-foreground">UTILITOP</div>
            <div className="text-xs text-muted-foreground">Déménagement & Transport</div>
          </div>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#services" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">Services</a>
          <a href="#comment-ca-marche" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">Comment ça marche</a>
          <a href="#avis" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">Avis</a>
          <a href="#faq" className="text-muted-foreground font-semibold text-sm px-2.5 py-2.5 rounded-xl hover:bg-foreground/[0.06] hover:text-foreground transition-colors">FAQ</a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <a href="tel:+32491507960" className="md:hidden glass-card-flat px-3 py-2.5 rounded-[14px] text-muted-foreground font-bold text-sm flex items-center gap-2">
            <Phone className="w-4 h-4" /> +32 491 50 79 60
          </a>
          <a href="#devis" className="btn-glass text-sm hidden sm:inline-flex">Devis rapide</a>
          <a href="#devis" className="btn-primary text-sm">Obtenir un devis</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
