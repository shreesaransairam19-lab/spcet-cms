import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  let supabaseResponse = NextResponse.json({ success: true });

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

  try {
    await supabase.auth.signOut({ scope: "global" });
  } catch {
    // continue even if signOut fails
  }

  const cookieHeader = request.headers.get("cookie") || "";
  cookieHeader.split(";").forEach((c) => {
    const [rawName] = c.split("=");
    if (rawName) {
      const name = rawName.trim();
      supabaseResponse.cookies.set(name, "", {
        maxAge: 0,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    }
  });

  return supabaseResponse;
}
