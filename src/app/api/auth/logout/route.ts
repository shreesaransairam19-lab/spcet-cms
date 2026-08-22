import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function handleLogout() {
  try {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.signOut();
  } catch (e) {
    console.error("SignOut error:", e);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://spcet-cms.vercel.app";
  const response = NextResponse.redirect(new URL("/login", baseUrl));

  const supabaseProjectRef = "fjgspfjbmvgecesbfuji";
  const sbCookieNames = [
    `sb-${supabaseProjectRef}-auth-token`,
    `sb-${supabaseProjectRef}-auth-token-code-verifier`,
    `sb-${supabaseProjectRef}-auth-token-expires-at`,
    `sb-${supabaseProjectRef}-auth-token-refresh-token`,
    `sb-${supabaseProjectRef}-auth-token-refs`,
  ];

  const clearHeaders: string[] = [];
  sbCookieNames.forEach((name) => {
    clearHeaders.push(
      `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`,
      `${name}=; Max-Age=0; Path=/; SameSite=Lax`
    );
  });

  response.headers.set("Set-Cookie", clearHeaders.join(", "));

  return response;
}

export async function POST() {
  return handleLogout();
}

export async function GET() {
  return handleLogout();
}
