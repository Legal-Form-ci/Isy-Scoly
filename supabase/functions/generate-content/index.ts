import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, input } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let toolDef: any = {};

    if (type === "promotion") {
      systemPrompt = `Tu es un expert en marketing et promotions pour Scoly, une plateforme de fournitures scolaires et bureautiques en Côte d'Ivoire.
À partir du texte brut fourni (même un simple mot), génère une promotion complète et professionnelle.
Les prix sont en FCFA. Adapte le type de remise et la valeur au contexte ivoirien.`;

      toolDef = {
        type: "function",
        function: {
          name: "generate_promotion",
          description: "Generate a complete promotion",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string", description: "Nom accrocheur de la promotion" },
              description: { type: "string", description: "Description courte et engageante" },
              discount_type: { type: "string", enum: ["percent", "fixed"] },
              discount_value: { type: "number", description: "Valeur de la remise" },
              min_amount: { type: "number", description: "Montant minimum d'achat en FCFA" },
              max_uses: { type: "number", description: "Nombre maximum d'utilisations (null=illimité)" },
              applies_to: { type: "string", enum: ["all", "primaire", "secondaire", "bureautique"] },
              duration_days: { type: "number", description: "Durée en jours" },
            },
            required: ["name", "description", "discount_type", "discount_value", "min_amount", "applies_to", "duration_days"],
            additionalProperties: false,
          },
        },
      };
    } else if (type === "advertisement") {
      systemPrompt = `Tu es un expert en publicité digitale pour Scoly, une plateforme de fournitures scolaires et bureautiques en Côte d'Ivoire.
À partir du texte brut fourni (même un simple mot), génère une publicité complète et professionnelle.
Le lien doit pointer vers une page du site (/shop, /shop?category=..., /actualites, etc.).
Le texte du bouton CTA doit être court et engageant.`;

      toolDef = {
        type: "function",
        function: {
          name: "generate_advertisement",
          description: "Generate a complete advertisement",
          parameters: {
            type: "object",
            properties: {
              title: { type: "string", description: "Titre impactant de la publicité" },
              description: { type: "string", description: "Description courte et engageante" },
              link_url: { type: "string", description: "URL de destination (relative au site)" },
              link_text: { type: "string", description: "Texte du bouton CTA" },
              priority: { type: "number", description: "Priorité (0-10)" },
              image_prompt: { type: "string", description: "Prompt pour générer une image réaliste liée au sujet. Contexte africain/ivoirien, personnes noires/africaines uniquement." },
            },
            required: ["title", "description", "link_url", "link_text", "priority", "image_prompt"],
            additionalProperties: false,
          },
        },
      };
    } else {
      throw new Error("Type invalide. Utilisez 'promotion' ou 'advertisement'.");
    }

    const toolName = type === "promotion" ? "generate_promotion" : "generate_advertisement";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Génère un contenu complet à partir de: "${input}"` },
        ],
        tools: [toolDef],
        tool_choice: { type: "function", function: { name: toolName } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes atteinte, réessayez plus tard." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA insuffisants." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const result = JSON.parse(toolCall.function.arguments);

    // If advertisement, try to generate image
    if (type === "advertisement" && result.image_prompt) {
      try {
        const imgResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [
              { role: "user", content: result.image_prompt + ". Realistic professional photography in African/Ivorian context. Only Black African people. High quality, natural lighting, no text overlay, no watermark." },
            ],
            modalities: ["image", "text"],
          }),
        });
        if (imgResp.ok) {
          const imgData = await imgResp.json();
          result.generated_image = imgData.choices?.[0]?.message?.images?.[0]?.image_url?.url || null;
        }
      } catch (e) {
        console.error("Image gen error:", e);
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
