import { serve } from "https://deno.land/std@0.168.0/http/server.js"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { searchParams, origin } = new URL(req.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state') // user_id from Supabase

    if (!code || !state) {
      throw new Error('Missing code or state')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Exchange code for access token from Notion
    const tokenResponse = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${Deno.env.get('NOTION_CLIENT_ID')}:${Deno.env.get('NOTION_CLIENT_SECRET')}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${origin}/supabase/functions/v1/notion-oAuth/Auth`, // Adjust to deployed URL
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.statusText}`)
    }

    const { access_token, refresh_token } = await tokenResponse.json()

    // Store in Supabase DB (assume 'notion_integrations' table: id, user_id, access_token, refresh_token, created_at)
    const { error } = await supabase
      .from('notion_integrations')
      .upsert({ user_id: state, access_token, refresh_token }, { onConflict: 'user_id' })

    if (error) {
      throw error
    }

    // Redirect back to the app's Notion page
    return Response.redirect(`${origin}/app/inbox/notion`, 302) // Adjust path as needed

  } catch (error) {
    console.error('OAuth error:', error)
    return Response.redirect(`${origin}/app/inbox/notion?error=${encodeURIComponent(error.message)}`, 302)
  }
})
