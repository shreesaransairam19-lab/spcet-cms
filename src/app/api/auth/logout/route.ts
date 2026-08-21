import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  let supabaseResponse = NextResponse.json({ success: true, message: "Logged out" });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("cookie") || "";
          const cookies: { name: string; value: string }[] = [];
          cookieHeader.split(";").forEach((c) => {
            const [name, ...rest] = c.split("=");
            if (name) cookies.push({ name: name.trim(), value: rest.join("=").trim() });
          });
          return cookies;
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as any)
          );
        },
      },
    }
  );

  await supabase.auth.signOut();

  const cookieHeader = request.headers.get("cookie") || "";
  cookieHeader.split(";").forEach((c) => {
    const [name] = c.split("=");
    if (name) supabaseResponse.cookies.set(name.trim(), "", { maxAge: 0, path: "/" });
  });

  return supabaseResponse;
}
