import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const token = params.get("token");
    if (!token) { setStatus("error"); return; }
    (async () => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
        .eq("unsubscribe_token", token);
      setStatus(error ? "error" : "ok");
    })();
  }, [params]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md text-center">
        {status === "loading" && <p>Traitement…</p>}
        {status === "ok" && (
          <>
            <CheckCircle className="text-primary mx-auto mb-4" size={48} />
            <h1 className="font-display text-2xl font-bold mb-2">Désinscription confirmée</h1>
            <p className="text-muted-foreground mb-4">Vous ne recevrez plus nos newsletters. À bientôt sur Scoly !</p>
            <Link to="/" className="text-primary hover:underline">← Retour à l'accueil</Link>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="text-destructive mx-auto mb-4" size={48} />
            <h1 className="font-display text-2xl font-bold mb-2">Lien invalide</h1>
            <Link to="/" className="text-primary hover:underline">← Retour à l'accueil</Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
