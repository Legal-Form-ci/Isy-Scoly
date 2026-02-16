import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  articleId?: string;
  status?: "approved" | "rejected";
  reason?: string;
  // Generic notification fields
  type?: string;
  userId?: string;
  data?: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: NotificationRequest = await req.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ========== GENERIC NOTIFICATION MODE ==========
    if (body.type && body.userId) {
      const { type, userId, data } = body;
      console.log('Generic notification:', { type, userId });

      let userName = '';
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .single();
      userName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : '';

      const prefix = 'Message généré automatiquement, ne pas répondre. ';
      const greeting = userName ? `Bonjour ${userName}, ` : 'Bonjour, ';

      let title = '';
      let message = '';

      switch (type) {
        case 'welcome':
          title = 'Bienvenue sur ScoOffice+ !';
          message = `${prefix}${greeting}bienvenue sur ScoOffice+ ! Découvrez notre catalogue de fournitures scolaires et bureautiques avec livraison gratuite partout en Côte d'Ivoire.`;
          break;
        case 'security_alert':
          title = 'Alerte de sécurité';
          message = `${prefix}${greeting}une connexion a été détectée sur votre compte depuis ${data?.device || 'un appareil inconnu'}. Si ce n'était pas vous, sécurisez votre compte immédiatement.`;
          break;
        case 'promotion':
          title = data?.title || 'Offre spéciale ScoOffice+';
          message = `${prefix}${greeting}${data?.message || 'une nouvelle promotion est disponible !'}`;
          break;
        case 'admin_announcement':
          title = data?.title || 'Annonce ScoOffice+';
          message = `${prefix}${data?.message || ''}`;
          break;
        default:
          title = 'Notification ScoOffice+';
          message = `${prefix}${greeting}vous avez une nouvelle notification.`;
      }

      await supabase.from('notifications').insert({
        user_id: userId,
        type: type || 'system',
        title,
        message,
        data: data || {},
      });

      // Broadcast to all users
      if (type === 'broadcast') {
        const { data: users } = await supabase.from('profiles').select('id').limit(1000);
        if (users && users.length > 0) {
          const notifications = users.map(u => ({
            user_id: u.id,
            type: 'promotion',
            title: data?.title || 'Annonce ScoOffice+',
            message: `${prefix}${data?.message || 'Nouvelle annonce disponible.'}`,
            data: data || {},
          }));
          await supabase.from('notifications').insert(notifications);
        }
      }

      return new Response(
        JSON.stringify({ success: true, title, message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ========== ARTICLE NOTIFICATION MODE ==========
    const { articleId, status, reason } = body;
    console.log(`Sending notification for article ${articleId}, status: ${status}`);

    const { data: article, error: articleError } = await supabase
      .from("articles")
      .select("title_fr, author_id")
      .eq("id", articleId)
      .single();

    if (articleError || !article) {
      throw new Error("Article not found");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", article.author_id)
      .single();

    const { data: userData } = await supabase.auth.admin.getUserById(article.author_id);
    const authorEmail = userData?.user?.email;

    if (!authorEmail) {
      throw new Error("Author email not found");
    }

    const authorName = profile?.first_name 
      ? `${profile.first_name} ${profile.last_name || ""}`.trim() 
      : "Auteur";

    // Create in-app notification
    await supabase.from('notifications').insert({
      user_id: article.author_id,
      type: 'article',
      title: status === 'approved' ? 'Article publié !' : 'Article à réviser',
      message: `Message généré automatiquement, ne pas répondre. ${
        status === 'approved' 
          ? `Votre article "${article.title_fr}" a été approuvé et publié sur ScoOffice+.`
          : `Votre article "${article.title_fr}" nécessite des modifications.${reason ? ' Raison : ' + reason : ''}`
      }`,
      data: { article_id: articleId, status, reason },
    });

    let subject: string;
    let htmlContent: string;

    if (status === "approved") {
      subject = `🎉 Votre article "${article.title_fr}" a été approuvé !`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #1a2744; margin: 0; padding: 0; background: #f0f2f5; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0f2b4a 0%, #1a4270 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 22px; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
            .button { display: inline-block; background: #2d8a6e; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: 600; }
            .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
            .auto-msg { font-size: 11px; color: #999; text-align: center; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Article Approuvé !</h1>
              <p>ScoOffice+ — Plateforme Scolaire & Bureautique</p>
            </div>
            <div class="content">
              <p class="auto-msg">Message généré automatiquement, ne pas répondre.</p>
              <p>Bonjour <strong>${authorName}</strong>,</p>
              <p>Votre article <strong>"${article.title_fr}"</strong> a été approuvé et publié sur ScoOffice+.</p>
              <p>Merci pour votre contribution !</p>
              <center>
                <a href="https://scoofficeplus.ci/actualites" class="button">Voir mon article</a>
              </center>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ScoOffice+ — Tous droits réservés</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      subject = `📝 Votre article "${article.title_fr}" nécessite des modifications`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #1a2744; margin: 0; padding: 0; background: #f0f2f5; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 22px; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
            .reason-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .button { display: inline-block; background: #d97706; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: 600; }
            .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
            .auto-msg { font-size: 11px; color: #999; text-align: center; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📝 Article à réviser</h1>
              <p>ScoOffice+ — Plateforme Scolaire & Bureautique</p>
            </div>
            <div class="content">
              <p class="auto-msg">Message généré automatiquement, ne pas répondre.</p>
              <p>Bonjour <strong>${authorName}</strong>,</p>
              <p>Votre article <strong>"${article.title_fr}"</strong> nécessite des modifications.</p>
              ${reason ? `<div class="reason-box"><strong>Commentaire :</strong><p>${reason}</p></div>` : ""}
              <p>Modifiez votre article depuis votre espace auteur et soumettez-le à nouveau.</p>
              <center>
                <a href="https://scoofficeplus.ci/author" class="button">Modifier mon article</a>
              </center>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ScoOffice+ — Tous droits réservés</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Send email if Resend is configured
    if (RESEND_API_KEY) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "ScoOffice+ <onboarding@resend.dev>",
          to: [authorEmail],
          subject,
          html: htmlContent,
        }),
      });

      const emailData = await emailResponse.json();
      console.log("Email sent:", emailData);
    } else {
      console.log("RESEND_API_KEY not configured, skipping email. In-app notification created.");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
