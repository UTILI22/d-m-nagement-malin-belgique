import { useState, useRef } from "react";
import { MapPin, ArrowRight, CalendarIcon, Camera } from "lucide-react";
import heroImage from "@/assets/hero-moving.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [propertyFrom, setPropertyFrom] = useState("");
  const [propertyTo, setPropertyTo] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const msg = encodeURIComponent(
      `Bonjour, je souhaite un devis.\nDépart: ${departure} (${propertyFrom})\nDestination: ${arrival} (${propertyTo})\nDate: ${date || "Pas encore fixée"}\nPhotos: ${photos.length} fichier(s)`
    );
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  const propertyOptions = [
    { value: "maison", label: t("hero.property_house") },
    { value: "appartement", label: t("hero.property_apartment") },
    { value: "studio", label: t("hero.property_studio") },
    { value: "garde-meuble", label: t("hero.property_storage") },
    { value: "colocation", label: t("hero.property_shared") },
  ];

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
          {t("hero.title_1")}{" "}
          <br className="hidden sm:block" />
          {t("hero.title_2")}{" "}
          <span className="text-primary">{t("hero.title_accent")}</span>
        </h1>

        <p className="text-[clamp(15px,1.4vw,18px)] leading-relaxed text-muted-foreground mt-4 max-w-xl">
          {t("hero.subtitle")}
        </p>

        {/* Form card */}
        <div className="mt-8 max-w-2xl glass-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">{t("hero.form_title")}</h2>

          {/* Row 1: Departure + Destination */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.departure")}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="glass-input pl-10" placeholder={t("hero.departure_placeholder")} value={departure} onChange={e => setDeparture(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.destination")}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="glass-input pl-10" placeholder={t("hero.destination_placeholder")} value={arrival} onChange={e => setArrival(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Row 2: Property types */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.property_type")}</label>
              <select className="glass-input" value={propertyFrom} onChange={e => setPropertyFrom(e.target.value)}>
                <option value="">{t("hero.property_select")}</option>
                {propertyOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.property_type")}</label>
              <select className="glass-input" value={propertyTo} onChange={e => setPropertyTo(e.target.value)}>
                <option value="">{t("hero.property_select")}</option>
                {propertyOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Date + Photo */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.date")}</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input className="glass-input pl-10" type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.photo")}</label>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => setPhotos(Array.from(e.target.files || []))} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="glass-input flex items-center gap-2 text-muted-foreground text-sm cursor-pointer w-full"
              >
                <Camera className="w-4 h-4" />
                {photos.length > 0 ? `${photos.length} photo(s)` : t("hero.photo_label")}
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} className="btn-primary text-sm mt-4">
            {t("hero.submit")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
