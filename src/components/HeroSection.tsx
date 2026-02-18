import { MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-moving.jpg";

const HeroSection = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (departure.trim() && arrival.trim()) {
      alert(`Demande de devis envoyée !\nDépart : ${departure}\nArrivée : ${arrival}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Équipe de déménagement" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4 animate-fade-in-up">
            Votre déménagement en Belgique, <span className="text-primary">simplifié</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Obtenez un devis gratuit en 2 minutes. Service professionnel dans toute la Belgique : Bruxelles, Anvers, Liège, Gand, Namur et plus.
          </p>

          {/* Quote form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-xl p-6 shadow-lg animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-lg font-bold text-foreground mb-4">Demander un devis gratuit</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="text"
                  placeholder="Adresse de départ"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  required
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-foreground" />
                <input
                  type="text"
                  placeholder="Adresse d'arrivée"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Obtenir mon devis
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
