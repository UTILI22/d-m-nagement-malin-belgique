import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Check, X, CalendarIcon, Camera, Mail, Phone, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import packTransport from "@/assets/pack-transport.jpg";
import packDemenagement from "@/assets/pack-demenagement.jpg";
import packPremium from "@/assets/pack-premium.jpg";
import packCustom from "@/assets/pack-custom.jpg";

const packs = [
  { key: "pack1", image: packTransport, popular: false, features: 3 },
  { key: "pack2", image: packDemenagement, popular: true, features: 4 },
  { key: "pack3", image: packPremium, popular: false, features: 5 },
  { key: "pack4", image: packCustom, popular: false, features: 3 },
];

const PacksSection = () => {
  const { t } = useLanguage();
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [propertyFrom, setPropertyFrom] = useState("");
  const [propertyTo, setPropertyTo] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const propertyOptions = [
    { value: "maison", label: t("hero.property_house") },
    { value: "appartement", label: t("hero.property_apartment") },
    { value: "studio", label: t("hero.property_studio") },
    { value: "garde-meuble", label: t("hero.property_storage") },
    { value: "colocation", label: t("hero.property_shared") },
  ];

  const handleSubmit = async () => {
    if (!departure.trim() || !arrival.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-quote", {
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
      setSelectedPack(null);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const packName = selectedPack ? t(`${selectedPack}.name`) : "";
    const msg = encodeURIComponent(
      `Bonjour, je suis intéressé par le ${packName}.\nDépart: ${departure || "Non renseigné"} (${propertyFrom || "-"})\nDestination: ${arrival || "Non renseigné"} (${propertyTo || "-"})\nDate: ${date || "Pas encore fixée"}\nEmail: ${email || "Non renseigné"}\nTéléphone: ${phone || "Non renseigné"}`
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

  return (
    <section id="packs" className="py-14">
      <div className="container mx-auto">
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">{t("packs.title")}</h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          {t("packs.subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packs.map((p) => (
            <div
              key={p.key}
              className={`group rounded-2xl overflow-hidden relative flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                p.popular
                  ? "ring-2 ring-primary shadow-[0_0_30px_rgba(243,198,34,.15)]"
                  : "border border-foreground/[0.08]"
              }`}
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
            >
              {p.popular && (
                <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ background: "linear-gradient(180deg, hsl(46 95% 66%), hsl(46 89% 54%))" }}>
                  ⭐ Populaire
                </span>
              )}

              <div className="relative h-40 overflow-hidden">
                <img src={p.image} alt={t(`${p.key}.name`)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{t(`${p.key}.name`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t(`${p.key}.desc`)}</p>

                <ul className="space-y-1.5 mb-4">
                  {Array.from({ length: p.features }).map((_, i) => {
                    const featureKey = `${p.key}.feature${i + 1}`;
                    const featureText = t(featureKey);
                    if (featureText === featureKey) return null;
                    return (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        {featureText}
                      </li>
                    );
                  })}
                </ul>

                <p className="text-primary font-extrabold text-base mb-3">{t(`${p.key}.price`)}</p>

                <button
                  onClick={() => setSelectedPack(p.key)}
                  className={`${p.popular ? "btn-primary" : "btn-glass"} text-sm w-full`}
                >
                  {t("packs.cta")} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pack Quote Modal */}
      <Dialog open={!!selectedPack} onOpenChange={(open) => !open && setSelectedPack(null)}>
        <DialogContent className="glass-card border-white/10 bg-background/95 backdrop-blur-xl max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">
              {selectedPack && t(`${selectedPack}.name`)} — {t("hero.form_title")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            <div className="grid sm:grid-cols-2 gap-3">
              <AddressAutocomplete label={t("hero.departure")} placeholder={t("hero.departure_placeholder")} value={departure} onChange={setDeparture} />
              <AddressAutocomplete label={t("hero.destination")} placeholder={t("hero.destination_placeholder")} value={arrival} onChange={setArrival} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
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

            <div className="grid sm:grid-cols-2 gap-3">
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
                <button type="button" onClick={() => fileRef.current?.click()} className="glass-input flex items-center gap-2 text-muted-foreground text-sm cursor-pointer w-full">
                  <Camera className="w-4 h-4" />
                  {photos.length > 0 ? `${photos.length} photo(s)` : t("hero.photo_label")}
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("confirm.email")} *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className="glass-input pl-10" type="email" placeholder={t("confirm.email_placeholder")} value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("confirm.phone")} *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className="glass-input pl-10" type="tel" placeholder={t("confirm.phone_placeholder")} value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting || !departure.trim() || !arrival.trim() || !email.trim() || !phone.trim()} className="btn-primary text-sm mt-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {t("confirm.sending")}</>
              ) : (
                <>{t("confirm.submit")} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
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

export default PacksSection;
