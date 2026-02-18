const steps = [
  { num: "1", title: "Demande de devis", desc: "Départ, destination, volume estimé, date et options." },
  { num: "2", title: "Confirmation", desc: "On valide ensemble le créneau, le véhicule et le tarif." },
  { num: "3", title: "Le jour J", desc: "On arrive à l'heure, on charge, on livre. Simple." },
];

const HowItWorks = () => {
  return (
    <section id="comment-ca-marche" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">Comment ça marche</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          3 étapes, pas de surprise.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="glass-card-flat p-5 rounded-lg">
              <div className="w-[34px] h-[34px] rounded-xl grid place-items-center font-black text-foreground mb-2.5" style={{ background: "rgba(32,201,151,.12)", border: "1px solid rgba(32,201,151,.20)" }}>
                {s.num}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 flex-wrap mt-6">
          <a href="#devis" className="btn-primary text-sm">Obtenir un devis</a>
          <a href="tel:+32491507960" className="btn-glass text-sm">📞 +32 491 50 79 60</a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
