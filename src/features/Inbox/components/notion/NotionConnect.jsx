import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import ErrorPage from "../../../../Components/ui/CmnCmpnts/ErrorPage";

const NotionConnect = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const CurntPath = `${location.pathname.toLowerCase()}`;

  const setConnect = async () => {
    try {
      setLoading(true);
      setError("");

      const client_id = import.meta.env.VITE_OAuth_Client_ID;
      if (!client_id) {
        throw new Error(
          "There is something wrong with site . Please try again later."
        );
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) return userError;
      if (!user) return setError("Error: User Not Found. If not login First !");

      const user_id = user?.id;

      const App_Notion_link = `${window.location.origin}/inbox/notion`;

      const notion_auth_URL = `https://api.notion.com/v1/oauth/authorize?client_id=${client_id}&response_type=code&owner=user&redirect_uri=${App_Notion_link}&state=${user_id}`;

      window.location.href = notion_auth_URL;
    } catch (err) {
      setError(
        err.message || "Something went wrong ehile connecting to Notion."
      );
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorPage children={error} path={CurntPath} />;
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center lg:ml-[550px]">
        <button
          className="border px-2 py-1"
          onClick={setConnect}
          disabled={loading}
        >
          {loading ? "Re-directing..." : "To be done Pending"}
        </button>
      </div>
    </>
  );
};

export default NotionConnect;
