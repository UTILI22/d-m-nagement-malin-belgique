import { useState } from "react";

const HeroSection = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [noDate, setNoDate] = useState(false);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Bonjour, je souhaite un devis.\nDépart: ${departure}\nDestination: ${arrival}\nService: ${service}\nDate: ${noDate ? "Pas encore fixée" : date}`);
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  return (
    <section className="py-12 md:py-14" id="devis">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-5 items-stretch">
          {/* Left */}
          <div className="p-6 md:p-7 rounded-lg" style={{ border: "1px solid rgba(255,255,255,.10)", background: "radial-gradient(500px 220px at 90% 0%, rgba(243,198,34,.18), transparent 70%), radial-gradient(500px 220px at 10% 0%, rgba(32,201,151,.16), transparent 70%), linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03))" }}>
            {/* Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full border border-foreground/10 bg-foreground/[0.05] text-muted-foreground text-[13px]">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(32,201,151,.12)]" />
              Disponible en Belgique • Réponse rapide
            </div>

            <h1 className="text-[clamp(30px,4vw,52px)] leading-[1.05] tracking-tight font-extrabold mt-3.5 mb-3 text-foreground">
              Déménagement & location utilitaire<br />
              <span className="text-primary">sans prise de tête.</span>
            </h1>

            <p className="text-[clamp(15px,1.4vw,18px)] leading-relaxed text-muted-foreground mb-0">
              Location avec ou sans chauffeur, transport point A → point B, et navettes multiples. Un devis clair, rapide, et une équipe fiable.
            </p>

            {/* KPIs */}
            <div className="flex gap-3 flex-wrap items-center mt-4">
              <div className="px-3 py-2.5 rounded-[14px] border border-foreground/10 bg-foreground/[0.04] text-[13px] text-muted-foreground">✅ Devis en quelques minutes</div>
              <div className="px-3 py-2.5 rounded-[14px] border border-foreground/10 bg-foreground/[0.04] text-[13px] text-muted-foreground">🧾 Prix transparents</div>
              <div className="px-3 py-2.5 rounded-[14px] border border-foreground/10 bg-foreground/[0.04] text-[13px] text-muted-foreground">🕒 Flexible (soir & week-end)</div>
            </div>

            {/* Form */}
            <div className="mt-5 p-4 rounded-lg border border-foreground/10" style={{ background: "rgba(7,27,22,.35)" }}>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Départ</label>
                  <input className="glass-input" placeholder="Adresse de départ" value={departure} onChange={e => setDeparture(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Destination</label>
                  <input className="glass-input" placeholder="Adresse d'arrivée" value={arrival} onChange={e => setArrival(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Type de service</label>
                  <select className="glass-input" value={service} onChange={e => setService(e.target.value)}>
                    <option value="">Choisir…</option>
                    <option>Déménagement</option>
                    <option>Location utilitaire (sans chauffeur)</option>
                    <option>Location utilitaire (avec chauffeur)</option>
                    <option>Transport point A → point B</option>
                    <option>Navettes multiples</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Date souhaitée</label>
                  <input className="glass-input" type="date" value={date} onChange={e => setDate(e.target.value)} disabled={noDate} />
                </div>
              </div>

              <div className="flex gap-2.5 flex-wrap mt-3 items-center justify-between">
                <label className="flex items-center gap-2.5 text-muted-foreground text-[13px] cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" checked={noDate} onChange={e => setNoDate(e.target.checked)} />
                  Je n'ai pas encore de date
                </label>
                <div className="flex gap-2.5 flex-wrap items-center">
                  <span className="text-xs text-foreground/50">💬 Réponse rapide par WhatsApp</span>
                  <button onClick={handleWhatsApp} className="btn-glass text-sm">WhatsApp</button>
                  <a href="tel:+32491507960" className="btn-primary text-sm">Appeler & devis</a>
                </div>
              </div>
            </div>

            {/* CTA bottom */}
            <div className="flex gap-2.5 flex-wrap mt-5">
              <a href="#services" className="btn-glass text-sm">Voir les services</a>
              <a href="#faq" className="btn-glass text-sm">Questions fréquentes</a>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative p-5 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,.10)", background: "radial-gradient(350px 160px at 60% 20%, rgba(255,212,84,.18), transparent 70%), linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))" }}>
            {/* Decorative shape */}
            <div className="absolute -top-10 -right-20 w-[260px] h-[260px] rotate-12 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 30%, rgba(243,198,34,.45), rgba(243,198,34,.08) 55%, transparent 70%)" }} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-2.5 py-2 rounded-full text-[13px] font-extrabold text-primary-foreground" style={{ background: "linear-gradient(180deg, hsl(46 95% 66%), hsl(46 89% 54%))", border: "1px solid rgba(0,0,0,.08)" }}>
                  ⭐ 4,8/5 — Clients satisfaits
                </span>
              </div>
              <p className="text-muted-foreground text-[13px]">Assurance & matériel sur demande</p>
            </div>

            <div className="relative mt-3 rounded-lg border border-foreground/10 p-4" style={{ background: "rgba(0,0,0,.15)" }}>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ce qu'on gère pour vous :<br /><br />
                Protection, chargement/déchargement, itinéraire optimisé, ponctualité.
              </p>
            </div>

            <div className="relative mt-3 grid grid-cols-2 gap-3">
              <div className="glass-card-flat p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Pack le plus demandé</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-foreground text-sm">Utilitaire + Chauffeur</span>
                  <span className="text-xs text-primary font-semibold">Devis rapide</span>
                </div>
              </div>
              <div className="glass-card-flat p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Zones</p>
                <p className="text-sm text-foreground font-medium">Bruxelles • Liège • Namur • Charleroi • +</p>
              </div>
            </div>

            <div className="relative mt-3 glass-card-flat p-4 rounded-lg text-center text-muted-foreground text-sm">
              Remplace ce bloc par une image de ton flyer / ton camion quand tu veux.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
