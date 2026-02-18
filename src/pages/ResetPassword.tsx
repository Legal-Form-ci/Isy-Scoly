import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import { CheckCircle, XCircle, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ResetPassword = () => {
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setStatus("form");
      } else {
        // Listen for auth state change (Supabase processes the hash)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === "PASSWORD_RECOVERY") {
            setStatus("form");
          }
        });
        
        // Give it a moment to process
        setTimeout(() => {
          if (status === "loading") {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const errorDesc = hashParams.get("error_description");
            if (errorDesc) {
              setStatus("error");
              setMessage(errorDesc);
            }
          }
        }, 3000);
        
        return () => subscription.unsubscribe();
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setStatus("loading");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Votre mot de passe a été mis à jour avec succès !");
      setTimeout(() => navigate("/account"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {status === "loading" && (
            <div className="text-center">
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Chargement...
              </h1>
              <p className="text-muted-foreground">
                Vérification de votre lien de réinitialisation.
              </p>
            </div>
          )}

          {status === "form" && (
            <>
              <h1 className="text-2xl font-display font-bold text-center text-foreground mb-2">
                Nouveau mot de passe
              </h1>
              <p className="text-center text-muted-foreground mb-6">
                Choisissez un nouveau mot de passe sécurisé pour votre compte Scoly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" className="w-full">
                  Mettre à jour le mot de passe
                </Button>
              </form>
            </>
          )}

          {status === "success" && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Mot de passe mis à jour !
              </h1>
              <p className="text-muted-foreground mb-6">{message}</p>
              <Button variant="hero" onClick={() => navigate("/account")} className="w-full">
                Accéder à mon compte
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Erreur
              </h1>
              <p className="text-muted-foreground mb-6">{message}</p>
              <Button variant="hero" onClick={() => navigate("/auth")} className="w-full">
                Retour à la connexion
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-8 text-center">
            © {new Date().getFullYear()} Scoly — Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
