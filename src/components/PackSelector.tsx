import { useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Check, Plus, Minus, ShoppingCart, CalendarIcon, Camera, Mail, Phone, Loader2, CheckCircle, MessageCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import packTransport from "@/assets/pack-transport.jpg";
import packDemenagement from "@/assets/pack-demenagement.jpg";
import packPremium from "@/assets/pack-premium.jpg";
import packCustom from "@/assets/pack-custom.jpg";
import liftServiceImg from "@/assets/lift-service.jpg";
import liftCamionImg from "@/assets/lift-camion.jpg";
import liftMaindoeuvreImg from "@/assets/lift-maindoeuvre.jpg";

const packs = [
  { key: "pack1", image: packTransport, popular: false, features: 3 },
  { key: "pack2", image: packDemenagement, popular: true, features: 4 },
  { key: "pack3", image: packPremium, popular: false, features: 5 },
  { key: "pack4", image: packCustom, popular: false, features: 3 },
];

const liftOptions = [
  { key: "lift1", image: liftServiceImg },
  { key: "lift2", image: liftCamionImg },
  { key: "lift3", image: liftMaindoeuvreImg },
];

type CartItem = { key: string; type: "pack" | "lift"; qty: number };

const PackSelector = () => {
  const { t } = useLanguage();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
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

  const addToCart = (key: string, type: "pack" | "lift") => {
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (type === "pack") {
        // Only one pack at a time — replace
        const withoutPacks = prev.filter((i) => i.type !== "pack");
        return [...withoutPacks, { key, type, qty: 1 }];
      }
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key, type, qty: 1 }];
    });
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const isInCart = (key: string) => cart.some((i) => i.key === key);
  const selectedPack = cart.find((i) => i.type === "pack");

  const handleSubmit = async () => {
    if (!departure.trim() || !arrival.trim() || !email.trim() || !phone.trim()) return;
    setIsSubmitting(true);
    try {
      // Upload photos to storage
      const photoUrls: string[] = [];
      const quoteId = crypto.randomUUID();
      for (const photo of photos) {
        const ext = photo.name.split(".").pop() || "jpg";
        const path = `${quoteId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("quote-photos")
          .upload(path, photo, { contentType: photo.type });
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("quote-photos").getPublicUrl(path);
          photoUrls.push(urlData.publicUrl);
        }
      }

      const cartSummary = cart.map((i) => `${t(`${i.key}.name`)}${i.qty > 1 ? ` x${i.qty}` : ""}`).join(", ");
      const { error } = await supabase.functions.invoke("submit-quote", {
        body: {
          departure,
          arrival,
          property_from: propertyFrom || null,
          property_to: propertyTo || null,
          move_date: date || null,
          photos_count: photos.length,
          email,
          phone,
          selected_pack: cartSummary || null,
          photo_urls: photoUrls,
        },
      });
      if (error) throw error;
      setShowQuoteForm(false);
      setShowSuccess(true);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const cartSummary = cart.map((i) => `${t(`${i.key}.name`)}${i.qty > 1 ? ` x${i.qty}` : ""}`).join(", ");
    const msg = encodeURIComponent(
      `Bonjour, je souhaite un devis.\nSélection: ${cartSummary}\nDépart: ${departure || "Non renseigné"}\nDestination: ${arrival || "Non renseigné"}\nDate: ${date || "Pas encore fixée"}\nEmail: ${email}\nTéléphone: ${phone}`
    );
    window.open(`https://wa.me/32491507960?text=${msg}`, "_blank");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCart([]);
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
    <section className="py-14">
      <div className="container mx-auto">
        {/* Step 1: Choose a pack */}
        <div className="mb-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("selector.step1")}</span>
        </div>
        <h2 className="text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight text-foreground mb-2.5">
          {t("selector.packs_title")}
        </h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          {t("selector.packs_subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {packs.map((p) => {
            const selected = selectedPack?.key === p.key;
            return (
              <div
                key={p.key}
                className={`group rounded-2xl overflow-hidden relative flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  selected
                    ? "ring-2 ring-primary shadow-[0_0_30px_rgba(243,198,34,.25)]"
                    : p.popular
                    ? "ring-2 ring-primary/50 shadow-[0_0_20px_rgba(243,198,34,.1)]"
                    : "border border-foreground/[0.08]"
                }`}
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                onClick={() => addToCart(p.key, "pack")}
              >
                {p.popular && !selected && (
                  <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ background: "linear-gradient(180deg, hsl(46 95% 66%), hsl(46 89% 54%))" }}>
                    ⭐ Populaire
                  </span>
                )}
                {selected && (
                  <span className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </span>
                )}

                <div className="relative h-36 overflow-hidden">
                  <img src={p.image} alt={t(`${p.key}.name`)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{t(`${p.key}.name`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{t(`${p.key}.desc`)}</p>

                  <ul className="space-y-1.5 mb-3">
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

                  <p className="text-primary font-extrabold text-base">{t(`${p.key}.price`)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 2: Add options */}
        <div className="mb-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{t("selector.step2")}</span>
        </div>
        <h2 className="text-[clamp(22px,3vw,28px)] font-extrabold tracking-tight text-foreground mb-2.5">
          {t("selector.options_title")}
        </h2>
        <p className="text-muted-foreground text-[clamp(15px,1.4vw,18px)] leading-relaxed mb-8">
          {t("selector.options_subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {liftOptions.map((opt) => {
            const inCart = cart.find((i) => i.key === opt.key);
            return (
              <div
                key={opt.key}
                className={`group rounded-2xl overflow-hidden relative flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  inCart
                    ? "ring-2 ring-primary shadow-[0_0_20px_rgba(243,198,34,.2)]"
                    : "border border-foreground/[0.08]"
                }`}
                style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.03))" }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={opt.image} alt={t(`${opt.key}.name`)} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{t(`${opt.key}.name`)}</h3>
                  <p className="text-primary font-extrabold text-lg mb-1">
                    {t(`${opt.key}.price_main`)} <span className="text-sm font-medium text-muted-foreground">{t(`${opt.key}.price_sub`)}</span>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{t(`${opt.key}.desc`)}</p>

                  {inCart ? (
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(opt.key, -1)} className="w-9 h-9 rounded-xl bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <span className="text-foreground font-bold text-lg min-w-[2ch] text-center">{inCart.qty}</span>
                      <button onClick={() => updateQty(opt.key, 1)} className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                        <Plus className="w-4 h-4 text-primary" />
                      </button>
                      <button onClick={() => removeFromCart(opt.key)} className="ml-auto w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(opt.key, "lift")} className="btn-glass text-sm w-full">
                      <Plus className="w-4 h-4" /> {t("selector.add_option")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-foreground/10 bg-background/95 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,.3)]">
          <div className="container mx-auto flex items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">
                  {cart.map((i) => `${t(`${i.key}.name`)}${i.qty > 1 ? ` ×${i.qty}` : ""}`).join(" + ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cart.length} {t("selector.items_selected")}
                </p>
              </div>
            </div>
            <button onClick={() => setShowQuoteForm(true)} className="btn-primary text-sm shrink-0">
              {t("selector.request_quote")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quote Form Modal */}
      <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
        <DialogContent className="glass-card border-white/10 bg-background/95 backdrop-blur-xl max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              {t("selector.form_title")}
            </DialogTitle>
          </DialogHeader>

          {/* Cart recap */}
          <div className="rounded-xl bg-foreground/5 p-4 space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t("selector.your_selection")}</p>
            {cart.map((item) => (
              <div key={item.key} className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{t(`${item.key}.name`)}</span>
                <span className="text-muted-foreground">{item.qty > 1 ? `×${item.qty}` : ""}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-2">
            <div className="grid sm:grid-cols-2 gap-3">
              <AddressAutocomplete label={t("hero.departure")} placeholder={t("hero.departure_placeholder")} value={departure} onChange={setDeparture} />
              <AddressAutocomplete label={t("hero.destination")} placeholder={t("hero.destination_placeholder")} value={arrival} onChange={setArrival} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.property_type")}</label>
                <select className="glass-input" value={propertyFrom} onChange={(e) => setPropertyFrom(e.target.value)}>
                  <option value="">{t("hero.property_select")}</option>
                  {propertyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.property_type")}</label>
                <select className="glass-input" value={propertyTo} onChange={(e) => setPropertyTo(e.target.value)}>
                  <option value="">{t("hero.property_select")}</option>
                  {propertyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.date")}</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input className="glass-input pl-10" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("hero.photo")}</label>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => setPhotos(Array.from(e.target.files || []))} />
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
                  <input className="glass-input pl-10" type="email" placeholder={t("confirm.email_placeholder")} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">{t("confirm.phone")} *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input className="glass-input pl-10" type="tel" placeholder={t("confirm.phone_placeholder")} value={phone} onChange={(e) => setPhone(e.target.value)} required />
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

export default PackSelector;
