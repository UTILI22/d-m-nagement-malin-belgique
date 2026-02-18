const services = [
  { icon: "🚚", title: "Déménagement", desc: "Pour studio, maison ou bureau. Organisation, protection et manutention selon votre demande." },
  { icon: "🧑‍✈️", title: "Avec ou sans chauffeur", desc: "Vous conduisez ou on s'en charge. Idéal si vous n'avez pas le permis utilitaire." },
  { icon: "📍", title: "Point A → Point B", desc: "Transport d'un meuble, électroménager, colis volumineux. Rapide et sécurisé." },
  { icon: "🔁", title: "Navettes multiples", desc: "Plusieurs allers-retours ? On optimise le trajet et le timing pour réduire le coût." },
  { icon: "🧰", title: "Matériel & protection", desc: "Couvertures, sangles, diable… sur demande. Vos biens voyagent en sécurité." },
  { icon: "🗓️", title: "Flexible", desc: "Créneaux adaptés : semaine, soir et week-end selon disponibilité." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">Services</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          Des options simples, adaptées à votre besoin. On vous aide à choisir.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.title} className="glass-card-flat p-5 rounded-lg">
              <div className="w-10 h-10 rounded-[14px] grid place-items-center mb-2.5 text-lg" style={{ background: "rgba(243,198,34,.12)", border: "1px solid rgba(243,198,34,.25)" }}>
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
