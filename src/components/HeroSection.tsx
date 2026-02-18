import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-moving.jpg";

const HeroSection = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSubmit = () => {
    const msg = encodeURIComponent(`Bonjour, je souhaite un devis.\nDépart: ${departure}\nDestination: ${arrival}`);
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  return (
    <section className="relative min-h-[85vh] flex items-center" id="devis">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Équipe de déménagement" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 py-20">
        <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-tight font-extrabold text-foreground max-w-2xl">
          Votre déménagement{" "}
          <br className="hidden sm:block" />
          en Belgique,{" "}
          <span className="text-primary">simplifié.</span>
        </h1>

        <p className="text-[clamp(15px,1.4vw,18px)] leading-relaxed text-muted-foreground mt-4 max-w-xl">
          Obtenez un devis gratuit en 2 minutes. Service professionnel dans toute la Belgique : Bruxelles, Anvers, Liège, Gand, Namur et plus.
        </p>

        {/* Form card */}
        <div className="mt-8 max-w-xl glass-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Demander un devis gratuit</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="glass-input pl-10"
                placeholder="Adresse de départ"
                value={departure}
                onChange={e => setDeparture(e.target.value)}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="glass-input pl-10"
                placeholder="Adresse d'arrivée"
                value={arrival}
                onChange={e => setArrival(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm mt-4">
            Obtenir mon devis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
