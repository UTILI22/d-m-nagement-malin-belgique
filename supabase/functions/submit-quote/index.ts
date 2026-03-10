import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const body = await req.json();
    const { departure, arrival, property_from, property_to, move_date, photos_count, email, phone, selected_pack, photo_urls } = body;

    console.log("[submit-quote] Received request:", {
      departure, arrival, photos_count,
      photo_urls_count: Array.isArray(photo_urls) ? photo_urls.length : 0,
      photo_urls: photo_urls,
    });

    if (!departure?.trim() || !arrival?.trim()) {
      return new Response(JSON.stringify({ error: "Departure and arrival are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // photo_urls are now sent directly from the client after upload
    const finalPhotoUrls = Array.isArray(photo_urls) ? photo_urls : [];
    console.log("[submit-quote] Saving photo_urls to DB:", finalPhotoUrls);

    const { data, error } = await supabase.from("quotes").insert({
      departure: departure.trim().substring(0, 200),
      arrival: arrival.trim().substring(0, 200),
      property_from: property_from?.substring(0, 50) || null,
      property_to: property_to?.substring(0, 50) || null,
      move_date: move_date || null,
      photos_count: photos_count || 0,
      email: email?.trim().substring(0, 255) || null,
      phone: phone?.trim().substring(0, 30) || null,
      selected_pack: selected_pack?.substring(0, 500) || null,
      photo_urls: finalPhotoUrls,
    }).select().single();

    if (error) {
      console.error("[submit-quote] DB insert error:", error);
      throw error;
    }

    console.log("[submit-quote] Quote saved successfully:", {
      id: data.id,
      photo_urls_saved: data.photo_urls,
    });

    // Send notification email (fire and forget)
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      
      await fetch(`${supabaseUrl}/functions/v1/send-notification-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ quote: data }),
      });
    } catch (emailErr) {
      console.error("[submit-quote] Email notification error (non-blocking):", emailErr);
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[submit-quote] Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
