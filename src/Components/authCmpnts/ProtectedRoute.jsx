import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import useStore from "../../Zustand/useAuthStore";
import LoadingPage from "../ui/CmnCmpnts/LoadingPage";

export const ProtectedRoute = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const session = useStore((s) => s.session);
  const setSession = useStore((s) => s.setSession);
  const setUser = useStore((s) => s.setUser);
  const setProfile = useStore((s) => s.setProfile);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);

      if (data?.session?.user) {
        setUser(data.session.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        setProfile(profile ?? null);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
        setUser(session?.user ?? null);

        if (session?.user) {
          (async () => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            setProfile(profile ?? null);
          })();
        } else {
          setProfile(null);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [setSession, setUser, setProfile]);

  if (isLoading) return <LoadingPage />;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
