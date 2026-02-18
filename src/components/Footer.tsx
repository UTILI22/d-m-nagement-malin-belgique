import { Truck, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-14">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DéménagePro</span>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Votre partenaire de confiance pour tous vos déménagements en Belgique depuis 2010.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +32 470 00 00 00</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@demenagepro.be</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bruxelles, Belgique</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Zones desservies</h4>
            <ul className="text-sm text-secondary-foreground/70 space-y-1">
              <li>Bruxelles</li>
              <li>Anvers</li>
              <li>Liège</li>
              <li>Gand</li>
              <li>Namur & Charleroi</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 mt-10 pt-6 text-center text-xs text-secondary-foreground/50">
          © 2025 DéménagePro. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
