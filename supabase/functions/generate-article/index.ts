import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { content, generateImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Tu es un rédacteur professionnel pour Scoly, une plateforme de fournitures scolaires et bureautiques en Côte d'Ivoire.

À partir du texte brut fourni par l'utilisateur (même un simple mot), tu dois générer un article complet et professionnel.

Tu dois retourner un JSON structuré avec les champs suivants:
- title_fr: Titre en français (impactant, professionnel)
- title_en: Titre en anglais
- title_de: Titre en allemand  
- title_es: Titre en espagnol
- excerpt_fr: Résumé accrocheur en français (2-3 phrases)
- excerpt_en: Résumé en anglais
- content_fr: Contenu complet structuré en HTML propre (h2, h3, p, ul, li, strong, em, table si pertinent). Le contenu doit être aéré, professionnel, bien structuré avec des sous-titres, des paragraphes espacés. Minimum 500 mots.
- content_en: Contenu en anglais (HTML)
- content_de: Contenu en allemand (HTML)
- content_es: Contenu en espagnol (HTML)
- category: Une des catégories suivantes: general, education, bureautique, resources, news, guides
- image_prompt: Si une image est demandée, un prompt détaillé en anglais pour générer une image réaliste et professionnelle liée au sujet.

RÈGLES:
- Le HTML doit être propre et sémantique, JAMAIS de balises visibles dans le rendu
- Le contenu doit être professionnel, sans effet "généré par IA"
- Utilise des paragraphes aérés, des listes, des sous-titres hiérarchisés
- Adapte le ton au sujet (formel pour communiqués, engageant pour blogs)
- Les traductions doivent être naturelles et idiomatiques`;

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
          { role: "user", content: `Génère un article complet à partir de ce texte: "${content}". ${generateImage ? "Inclus aussi un prompt pour générer une image. IMPORTANT pour le prompt image: la scène doit être réaliste, en contexte africain/ivoirien, avec uniquement des personnes noires/africaines. Jamais de personnes blanches/occidentales. Photographie réaliste professionnelle." : "Pas besoin de prompt image."}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_article",
              description: "Generate a complete structured article",
              parameters: {
                type: "object",
                properties: {
                  title_fr: { type: "string" },
                  title_en: { type: "string" },
                  title_de: { type: "string" },
                  title_es: { type: "string" },
                  excerpt_fr: { type: "string" },
                  excerpt_en: { type: "string" },
                  content_fr: { type: "string" },
                  content_en: { type: "string" },
                  content_de: { type: "string" },
                  content_es: { type: "string" },
                  category: { type: "string", enum: ["general", "education", "bureautique", "resources", "news", "guides"] },
                  image_prompt: { type: "string" },
                },
                required: ["title_fr", "title_en", "title_de", "title_es", "excerpt_fr", "excerpt_en", "content_fr", "content_en", "content_de", "content_es", "category"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_article" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes atteinte, réessayez plus tard." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits insuffisants." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const article = JSON.parse(toolCall.function.arguments);

    // If image generation requested, generate image
    let generatedImageUrl = null;
    if (generateImage && article.image_prompt) {
      try {
        const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [
              { role: "user", content: article.image_prompt + ". Realistic professional photography in African/Ivorian context. Only Black African people. High quality, natural lighting, no text overlay, no watermark, no cartoon, no illustration." },
            ],
            modalities: ["image", "text"],
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          generatedImageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url || null;
        }
      } catch (imgError) {
        console.error("Image generation error:", imgError);
      }
    }

    return new Response(JSON.stringify({ ...article, generated_image: generatedImageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-article error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
