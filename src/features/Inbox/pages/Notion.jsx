import React, { useState, useEffect } from "react";
import NotionConnect from "../components/notion/NotionConnect";
import { json, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import ErrorPage from "../../../Components/ui/CmnCmpnts/ErrorPage";
import NotionLoading from "../components/notion/NotionLoading";
import SuccessNotion from "../components/notion/SuccessNotion";
import NtnDashboard from "../components/notion/NtnDashboard";

const Notion = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [succeed, setSucceed] = useState(false);
  const navigate = useNavigate();

  //Param Fetching
  const [searchParam] = useSearchParams();
  const code = searchParam.get("code");
  const state = searchParam.get("state");

  const curntPath = `${window.location.pathname.toLowerCase()}`;

  //Fetching user metadata and using it further
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError)
          throw new Error(
            "Error fetching user Data! Check if logged in or not !"
          );
        if (user) setUser(user);
      } catch (err) {
        setError(err || "Something wrong with getting user Info");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  //Params Updating
  useEffect(() => {
    if (!user) return;

    if (code && state) {
      if (state !== user.id) {
        setError("State mismatch detected. Security warning!");
      }
    }
  }, [user, code, state]);

  if (loading) {
    return (
      <>
        <div className="lg:ml-[550px]">
          <NotionLoading />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="lg:ml-[550px]">
          <ErrorPage children={error} path={curntPath} />
        </div>
      </>
    );
  }

  //Sending code and state to supabase edge function

  const onContinue = async () => {
    const url = `${
      import.meta.env.VITE_SUPABASE_URL
    }/functions/notion-oAuth`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${user?.session?.access_token}`,
        },
        body: JSON.stringify({ code, state, user_id: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data.error);
        setError(data.error);
      } else {
        console.log("Success:", data);
        alert("Notion Connected Successfully!");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (code && state && user && state === user.id) {
    return (
      <>
        <div className="lg:ml-[550px]">
          <SuccessNotion code={code} user={user} onContinue={onContinue} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center lg:ml-[550px]">
        <div className="flex flex-col">
          <div>Notion Integration</div>
          <NotionConnect />
        </div>
      </div>
    </>
  );
};

export default Notion;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { supabase } from "../../../lib/supabaseClient";
// import NotionConnect from "../components/notion/NotionConnect";
// import NotionLoading from "../components/notion/NotionLoading";
// import SuccessNotion from "../components/notion/SuccessNotion";
// import ErrorPage from "../../../Components/ui/CmnCmpnts/ErrorPage";

// const Notion = () => {
//   const [step, setStep] = useState("loading"); // "loading" | "connect" | "success" | "error"
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [searchParam] = useSearchParams();
//   const navigate = useNavigate();

//   const code = searchParam.get("code");
//   const state = searchParam.get("state");
//   const curntPath = `${window.location.origin}${location.pathname.toLowerCase()}`;

//   // Fetch user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data, error: userError } = await supabase.auth.getUser();
//         if (userError || !data.user) throw new Error("Login required");
//         setUser(data.user);
//         setStep("connect"); // user fetched, ready to connect Notion
//       } catch (err) {
//         setError(err.message || "Failed to fetch user");
//         setStep("error");
//         navigate("/login");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   // Validate OAuth response
//   useEffect(() => {
//     if (!user || step === "loading") return;

//     if (code && state) {
//       if (state !== user.id) {
//         setError("State mismatch detected. Security warning!");
//         setStep("error");
//       } else {
//         setStep("success");
//       }
//     }
//   }, [user, code, state, step]);

//   // onContinue after success
//   const onContinue = async () => {
//     // Send code to backend to exchange for Notion access token
//   };

//   // Render based on step
//   if (step === "loading") return <NotionLoading />;
//   if (step === "error") return <ErrorPage children={error} path={curntPath} />;
//   if (step === "success")
//     return <SuccessNotion code={code} user={user} onContinue={onContinue} />;

//   // Default: connect Notion
//   return (
//     <div className="flex h-screen justify-center items-center lg:ml-[550px]">
//       <div className="flex flex-col">
//         <div>Notion Integration</div>
//         <NotionConnect />
//       </div>
//     </div>
//   );
// };

// export default Notion;
