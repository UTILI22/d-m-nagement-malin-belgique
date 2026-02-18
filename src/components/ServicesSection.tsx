import { Truck, Package, ShieldCheck, Clock } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Déménagement complet",
    description: "Prise en charge de A à Z : emballage, transport, déballage. On s'occupe de tout.",
  },
  {
    icon: Package,
    title: "Emballage & cartons",
    description: "Fourniture de matériel et service d'emballage professionnel pour protéger vos biens.",
  },
  {
    icon: ShieldCheck,
    title: "Assurance incluse",
    description: "Tous vos biens sont assurés pendant le transport. Déménagez l'esprit tranquille.",
  },
  {
    icon: Clock,
    title: "Flexible & ponctuel",
    description: "Disponible 7j/7, nous nous adaptons à votre emploi du temps. Toujours à l'heure.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Nos services</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Une gamme complète de services pour un déménagement sans stress en Belgique.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <s.icon className="w-6 h-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
