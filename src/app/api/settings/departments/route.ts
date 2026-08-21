import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.from("departments").select("*, hod:faculty(id, user:users(full_name))").order("name");
    if (error) return NextResponse.json({ success: false, data: null, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data, error: null });
  } catch (err) {
    return NextResponse.json({ success: false, data: null, error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient();
    const body = await request.json();
    const { action } = body;

    if (action === "create") {
      const { code, name, description } = body;
      if (!code || !name) return NextResponse.json({ success: false, data: null, error: "Code and name required" }, { status: 400 });
      const { data, error } = await supabase.from("departments").insert({ code, name, description: description || null, is_active: true }).select().single();
      if (error) return NextResponse.json({ success: false, data: null, error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data, error: null, message: "Department created" });
    }

    if (action === "update") {
      const { id, code, name, description } = body;
      if (!id) return NextResponse.json({ success: false, data: null, error: "ID required" }, { status: 400 });
      const { error } = await supabase.from("departments").update({ code, name, description, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) return NextResponse.json({ success: false, data: null, error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data: { id }, error: null, message: "Department updated" });
    }

    if (action === "delete") {
      const { id } = body;
      if (!id) return NextResponse.json({ success: false, data: null, error: "ID required" }, { status: 400 });
      const { error } = await supabase.from("departments").update({ is_active: false, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) return NextResponse.json({ success: false, data: null, error: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data: { id }, error: null, message: "Department deleted" });
    }

    return NextResponse.json({ success: false, data: null, error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, data: null, error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
