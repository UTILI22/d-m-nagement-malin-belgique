import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Check if user has admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .limit(1);

      if (roleError || !roles?.length) {
        await supabase.auth.signOut();
        throw new Error("Accès non autorisé. Vous n'êtes pas administrateur.");
      }

      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.functions.invoke("setup-admin", {
        body: { email, password },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setSetupDone(true);
      setSetupMode(false);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la configuration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: "linear-gradient(135deg, hsl(160 55% 7%), hsl(160 60% 5%))"
    }}>
      <div className="glass-card p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Admin Utilitop</h1>
        </div>

        {setupDone && (
          <div className="mb-4 p-3 rounded-xl bg-accent/20 border border-accent/30 text-accent text-sm text-center">
            ✅ Compte admin créé ! Vous pouvez maintenant vous connecter.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-destructive/20 border border-destructive/30 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
            <input
              className="glass-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Mot de passe</label>
            <input
              className="glass-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary text-sm w-full justify-center">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Chargement...</>
            ) : (
              <><LogIn className="w-4 h-4" /> Se connecter</>
            )}
          </button>
        </form>



      </div>
    </div>
  );
};

export default AdminLogin;
