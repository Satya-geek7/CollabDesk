import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import useStore from "../../Zustand/useAuthStore";
import LoadingPage from "../ui/CmnCmpnts/LoadingPage";

export const ProtectedRoute = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); // update Zustand store
      setLoading(false);
    };

    getSession();

    // Optionally, subscribe to auth state changes to keep store in sync
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession]);

  if (isLoading) return <LoadingPage />;

  if (!session) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
