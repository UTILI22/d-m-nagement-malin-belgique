import { useState, useRef } from "react";
import { ArrowRight, CalendarIcon, Camera, Phone, Mail, CheckCircle, MessageCircle, Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-moving.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const { t } = useLanguage();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [propertyFrom, setPropertyFrom] = useState("");
  const [propertyTo, setPropertyTo] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleOpenConfirm = () => {
    if (!departure.trim() || !arrival.trim()) return;
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-quote", {
        body: {
          departure,
          arrival,
          property_from: propertyFrom,
          property_to: propertyTo,
          move_date: date || null,
          photos_count: photos.length,
          email: email || null,
          phone: phone || null,
        },
      });

      if (error) throw error;
      
      setShowConfirm(false);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Bonjour, je souhaite un devis.\nDépart: ${departure} (${propertyFrom})\nDestination: ${arrival} (${propertyTo})\nDate: ${date || "Pas encore fixée"}\nEmail: ${email || "Non renseigné"}\nTéléphone: ${phone || "Non renseigné"}`
    );
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setDeparture("");
    setArrival("");
    setPropertyFrom("");
    setPropertyTo("");
    setDate("");
    setPhotos([]);
    setEmail("");
    setPhone("");
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
            <AddressAutocomplete
              label={t("hero.departure")}
              placeholder={t("hero.departure_placeholder")}
              value={departure}
              onChange={setDeparture}
            />
            <AddressAutocomplete
              label={t("hero.destination")}
              placeholder={t("hero.destination_placeholder")}
              value={arrival}
              onChange={setArrival}
            />
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

          <button onClick={handleOpenConfirm} className="btn-primary text-sm mt-4">
            {t("hero.submit")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="glass-card border-white/10 bg-background/95 backdrop-blur-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              {t("confirm.title")}
            </DialogTitle>
          </DialogHeader>

          {/* Recap */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-muted-foreground">{t("hero.departure")}</span>
              <span className="text-foreground font-medium">{departure} {propertyFrom && `(${propertyOptions.find(o => o.value === propertyFrom)?.label})`}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-muted-foreground">{t("hero.destination")}</span>
              <span className="text-foreground font-medium">{arrival} {propertyTo && `(${propertyOptions.find(o => o.value === propertyTo)?.label})`}</span>
            </div>
            {date && (
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">{t("hero.date")}</span>
                <span className="text-foreground font-medium">{date}</span>
              </div>
            )}
            {photos.length > 0 && (
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">{t("hero.photo")}</span>
                <span className="text-foreground font-medium">{photos.length} photo(s)</span>
              </div>
            )}
          </div>

          {/* Contact fields */}
          <div className="space-y-3 mt-2">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("confirm.email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="glass-input pl-10" type="email" placeholder={t("confirm.email_placeholder")} value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">{t("confirm.phone")}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="glass-input pl-10" type="tel" placeholder={t("confirm.phone_placeholder")} value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
          </div>

          <button onClick={handleConfirmSubmit} disabled={isSubmitting} className="btn-primary text-sm mt-2 w-full justify-center">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {t("confirm.sending")}</>
            ) : (
              <>{t("confirm.submit")} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={handleCloseSuccess}>
        <DialogContent className="glass-card border-white/10 bg-background/95 backdrop-blur-xl max-w-md text-center">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{t("success.title")}</h2>
            <p className="text-muted-foreground text-sm">{t("success.message")}</p>
            
            {email && (
              <p className="text-xs text-muted-foreground">
                {t("success.email_sent")} <span className="text-foreground font-medium">{email}</span>
              </p>
            )}

            <div className="w-full border-t border-white/10 pt-4 mt-2">
              <p className="text-xs text-muted-foreground mb-3">{t("success.whatsapp_cta")}</p>
              <button onClick={handleWhatsApp} className="btn-glass text-sm w-full justify-center" style={{ color: "#25D366", borderColor: "rgba(37,211,102,0.3)" }}>
                <MessageCircle className="w-4 h-4" /> {t("success.whatsapp_btn")}
              </button>
            </div>

            <button onClick={handleCloseSuccess} className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2">
              {t("success.close")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
