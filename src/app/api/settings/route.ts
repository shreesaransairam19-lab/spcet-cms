import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";

    let query = supabase.from("college_settings").select("*").order("key");
    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error) return NextResponse.json({ success: false, data: null, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data, error: null });
  } catch (err) {
    return NextResponse.json({ success: false, data: null, error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await request.json();
    const { settings } = body;

    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json({ success: false, data: null, error: "Settings array required" }, { status: 400 });
    }

    for (const setting of settings) {
      await supabase.from("college_settings").upsert({
        key: setting.key,
        value: setting.value,
        category: setting.category || "general",
        description: setting.description || null,
        updated_by: user?.id || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "key" });
    }

    return NextResponse.json({ success: true, data: null, error: null, message: "Settings updated" });
  } catch (err) {
    return NextResponse.json({ success: false, data: null, error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
