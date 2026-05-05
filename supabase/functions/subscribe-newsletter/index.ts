import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const { email, first_name, source } = await req.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Email invalide');

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { error } = await admin.from('newsletter_subscribers').upsert(
      { email: email.toLowerCase().trim(), first_name, source: source || 'website', is_active: true },
      { onConflict: 'email' },
    );
    if (error) throw error;

    // Welcome email
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Scoly <newsletter@scoly.ci>',
          to: [email],
          subject: '🎉 Bienvenue dans la communauté Scoly !',
          html: `<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
            <div style="background:#1a3a6e;padding:32px;text-align:center"><h1 style="color:#fff;margin:0;font-size:28px">Scoly</h1></div>
            <div style="padding:32px"><h2 style="color:#1a3a6e">Bienvenue ${first_name || ''} 👋</h2>
            <p style="color:#374151;line-height:1.6">Merci de rejoindre la newsletter Scoly. Vous recevrez nos meilleures offres sur les fournitures scolaires et bureautiques, et nos conseils pour la rentrée.</p>
            <a href="https://scoly.ci/shop" style="display:inline-block;background:#f59e0b;color:#fff;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:600;margin-top:16px">Découvrir la boutique</a>
            </div>
            <div style="background:#f9fafb;padding:20px;text-align:center;color:#6b7280;font-size:12px">© Scoly — Côte d'Ivoire</div>
          </div>`,
        }),
      }).catch(() => {});
    }

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
