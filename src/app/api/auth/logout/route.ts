import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ success: true });

  const cookieHeader = request.headers.get("cookie") || "";
  const cookieNames: string[] = [];
  cookieHeader.split(";").forEach((c) => {
    const [rawName] = c.split("=");
    if (rawName) cookieNames.push(rawName.trim());
  });

  const clearHeaders: string[] = [];
  cookieNames.forEach((name) => {
    clearHeaders.push(
      `${name}=; Max-Age=0; Path=/; SameSite=Lax`,
      `${name}=; Max-Age=0; Path=/; Domain=.vercel.app; SameSite=Lax`,
      `${name}=; Max-Age=0; Path=/; Domain=spcet-cms.vercel.app; SameSite=Lax`,
      `${name}=; Max-Age=0; Path=/; Domain=tsr12.vercel.app; SameSite=Lax`
    );
  });

  const supabaseProjectRef = "fjgspfjbmvgecesbfuji";
  const sbCookieNames = [
    `sb-${supabaseProjectRef}-auth-token`,
    `sb-${supabaseProjectRef}-auth-token-code-verifier`,
    `sb-${supabaseProjectRef}-auth-token-expires-at`,
    `sb-${supabaseProjectRef}-auth-token-refresh-token`,
    `sb-${supabaseProjectRef}-auth-token-refs`,
  ];

  sbCookieNames.forEach((name) => {
    clearHeaders.push(`${name}=; Max-Age=0; Path=/; SameSite=Lax`);
  });

  response.headers.set("Set-Cookie", clearHeaders.join(", "));

  return response;
}
