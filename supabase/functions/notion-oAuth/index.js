import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.3";

const FRONTEND_URL = Deno.env.get("FRONTEND_URL");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const CLIENT_ID = Deno.env.get("NOTION_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("NOTION_CLIENT_SECRET");

// client for verifying auth tokens
const supabaseAuth = createClient(SUPABASE_URL, ANON_KEY);

// client for saving tokens
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  const headers = {
    "Access-Control-Allow-Origin": FRONTEND_URL,
    "Content-Type": "application/json",
  };

  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 401,
        headers,
      });
    }

    // Verify JWT
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(authHeader);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 401,
        headers,
      });
    }

    const { code, state, user_id } = await req.json();
    if (!code || !state || !user_id) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers,
      });
    }

    if (user_id !== user.id || state !== user.id) {
      return new Response(JSON.stringify({ error: "State mismatch" }), {
        status: 403,
        headers,
      });
    }

    // Exchange code for Notion token
    const tokenRes = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${FRONTEND_URL}/inbox/notion`,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      return new Response(JSON.stringify({ error: tokenData.error }), {
        status: 400,
        headers,
      });
    }

    // Save tokens securely with service-role
    await supabaseAdmin.from("notion_tokens").upsert({
      user_id,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      workspace_name: tokenData.workspace_name,
      workspace_icon: tokenData.workspace_icon,
      bot_id: tokenData.bot_id,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers,
    });
  }
});
