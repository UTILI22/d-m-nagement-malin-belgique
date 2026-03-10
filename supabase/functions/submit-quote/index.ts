import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function base64ToUint8Array(base64DataUrl: string): { bytes: Uint8Array; contentType: string } {
  // data:image/jpeg;base64,/9j/4AAQ...
  const [header, b64] = base64DataUrl.split(",");
  const contentType = header?.match(/data:(.*?);/)?.[1] || "image/jpeg";
  const binaryStr = atob(b64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return { bytes, contentType };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { departure, arrival, property_from, property_to, move_date, photos_count, email, phone, selected_pack, photos_base64 } = body;

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

    // Upload photos to storage using service role key
    const photoUrls: string[] = [];
    const quoteId = crypto.randomUUID();

    if (Array.isArray(photos_base64)) {
      for (const photo of photos_base64) {
        try {
          const { bytes, contentType } = base64ToUint8Array(photo.data);
          const ext = photo.name?.split(".").pop() || "jpg";
          const path = `${quoteId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from("quote-photos")
            .upload(path, bytes, { contentType, upsert: true });

          if (uploadError) {
            console.error("Photo upload error:", uploadError);
          } else {
            const { data: urlData } = supabase.storage.from("quote-photos").getPublicUrl(path);
            photoUrls.push(urlData.publicUrl);
            console.log("Photo uploaded:", urlData.publicUrl);
          }
        } catch (photoErr) {
          console.error("Photo processing error:", photoErr);
        }
      }
    }

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
      photo_urls: photoUrls,
    }).select().single();

    if (error) {
      console.error("DB insert error:", error);
      throw error;
    }

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
      console.error("Email notification error (non-blocking):", emailErr);
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
