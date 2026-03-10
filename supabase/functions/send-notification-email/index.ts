const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quote } = await req.json();

    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL") || "utilitop25@gmail.com";
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dateStr = quote.created_at
      ? new Date(quote.created_at).toLocaleString("fr-BE", { timeZone: "Europe/Brussels" })
      : new Date().toLocaleString("fr-BE", { timeZone: "Europe/Brussels" });

    const subject = `Nouvelle demande #${quote.id?.substring(0, 8)} – ${quote.email || "Client"} – ${dateStr}`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #1a3a2a, #0d2818); padding: 24px 32px;">
          <h1 style="color: #f3c622; margin: 0; font-size: 22px;">📦 Nouvelle demande de devis</h1>
          <p style="color: #a7c4b8; margin: 4px 0 0; font-size: 14px;">${dateStr}</p>
        </div>
        
        <div style="padding: 24px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; width: 140px;">📍 Départ</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #111827;">${quote.departure}${quote.property_from ? ` (${quote.property_from})` : ""}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280;">📍 Destination</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #111827;">${quote.arrival}${quote.property_to ? ` (${quote.property_to})` : ""}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280;">📅 Date</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #111827;">${quote.move_date || "Non définie"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280;">📧 Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #111827;">${quote.email || "Non renseigné"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280;">📞 Téléphone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #111827;">${quote.phone || "Non renseigné"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280;">📸 Photos</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #111827;">${quote.photos_count || 0} photo(s)</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;">📦 Pack</td>
              <td style="padding: 10px 0; font-weight: 600; color: #111827;">${quote.selected_pack || "Aucun pack sélectionné"}</td>
            </tr>
          </table>
        </div>
        
        <div style="padding: 16px 32px; background: #f9fafb; text-align: center;">
          <p style="color: #6b7280; font-size: 13px; margin: 0;">Utilitop – Service de déménagement en Belgique</p>
        </div>
      </div>
    `;

    // Send email via Lovable transactional email
    const response = await fetch("https://email.lovable.dev/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        to: notificationEmail,
        subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Email send error:", errorText);
      // Don't fail the quote submission if email fails
      return new Response(
        JSON.stringify({ success: false, error: "Email sending failed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
