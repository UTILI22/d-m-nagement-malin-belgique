const testimonials = [
  {
    stars: "★★★★★",
    text: "\"Ponctuels, efficaces, et super soigneux avec les meubles. Devis clair, rien à redire.\"",
    name: "Sarah — Bruxelles",
    type: "Déménagement",
  },
  {
    stars: "★★★★★",
    text: "\"Transport rapide pour un frigo + machine à laver. Très pro, je recommande.\"",
    name: "Mehdi — Liège",
    type: "Point A → B",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="avis" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">Ils nous ont fait confiance</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          Quelques retours clients (exemples — remplace par tes vrais avis).
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card-flat p-5 rounded-lg">
              <p className="text-primary tracking-widest mb-2.5">{t.stars}</p>
              <p className="text-muted-foreground leading-relaxed mb-2.5">{t.text}</p>
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-foreground font-semibold text-sm">{t.name}</span>
                <span className="text-muted-foreground text-xs">{t.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
