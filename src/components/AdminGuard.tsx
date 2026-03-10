import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .limit(1);

      if (!roles?.length) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setAuthorized(true);
      setChecking(false);
    };

    check();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(160 55% 7%), hsl(160 60% 5%))" }}>
        <p className="text-muted-foreground">Vérification…</p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default AdminGuard;
