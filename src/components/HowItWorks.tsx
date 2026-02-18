const steps = [
  { num: "1", title: "Demandez un devis", desc: "Remplissez le formulaire avec vos adresses de départ et d'arrivée." },
  { num: "2", title: "Recevez votre offre", desc: "Nous vous envoyons un devis détaillé sous 24h, sans engagement." },
  { num: "3", title: "On déménage !", desc: "Notre équipe s'occupe de tout le jour J. Installez-vous tranquillement." },
];

const HowItWorks = () => {
  return (
    <section id="comment-ca-marche" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Comment ça marche ?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Trois étapes simples pour un déménagement réussi.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-extrabold mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
