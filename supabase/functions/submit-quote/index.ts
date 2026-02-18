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
    const { departure, arrival, property_from, property_to, move_date, photos_count, email, phone } = body;

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

    const { data, error } = await supabase.from("quotes").insert({
      departure: departure.trim().substring(0, 200),
      arrival: arrival.trim().substring(0, 200),
      property_from: property_from?.substring(0, 50) || null,
      property_to: property_to?.substring(0, 50) || null,
      move_date: move_date || null,
      photos_count: photos_count || 0,
      email: email?.trim().substring(0, 255) || null,
      phone: phone?.trim().substring(0, 30) || null,
    }).select().single();

    if (error) {
      console.error("DB insert error:", error);
      throw error;
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
