import { useState } from "react";
import mascot from "@/assets/mascot-utilitop.png";

const faqs = [
  { q: "Est-ce que vous faites aussi de petits transports ?", a: "Oui. Un meuble, électroménager, cartons… On adapte le véhicule et la formule." },
  { q: "Je peux louer sans chauffeur ?", a: "Oui, si vous préférez conduire. Sinon, on propose aussi la formule avec chauffeur." },
  { q: "Comment est calculé le prix ?", a: "Selon la distance, la durée estimée, le volume, le nombre d'allers-retours et les options (aide, matériel…)." },
  { q: "Vous intervenez où ?", a: "Partout en Belgique selon disponibilité. Dites-nous votre ville, on vous répond rapidement." },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">FAQ</h2>
            <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed">
              Les réponses aux questions qu'on reçoit le plus souvent.
            </p>
          </div>
          <img src={mascot} alt="Mascotte UTILITOP" className="w-36 h-36 object-contain hidden sm:block transition-transform duration-300 hover:-rotate-6 hover:scale-110 cursor-pointer" />
        </div>

        <div className="grid gap-3 max-w-3xl">
          {faqs.map((f, i) => (
            <details
              key={i}
              open={open === i}
              onClick={(e) => { e.preventDefault(); setOpen(open === i ? null : i); }}
              className="glass-card-flat p-4 rounded-md cursor-pointer"
            >
              <summary className="font-bold text-foreground">{f.q}</summary>
              {open === i && <p className="text-muted-foreground mt-2.5 leading-relaxed text-sm">{f.a}</p>}
            </details>
          ))}
        </div>

        <div className="flex gap-2.5 flex-wrap items-center mt-6">
          <a href="#devis" className="btn-primary text-sm">Devis gratuit</a>
          <span className="text-muted-foreground text-sm">ou</span>
          <a href="https://wa.me/32491507960" target="_blank" rel="noopener noreferrer" className="btn-glass text-sm">💬 WhatsApp</a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
