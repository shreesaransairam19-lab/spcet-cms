import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await getSupabaseServerClient();
    const { id } = await params;

    const { data: receipt, error: receiptError } = await supabase
      .from("fee_receipts")
      .select(`
        *,
        payment:fee_payments(
          *,
          student:students(
            id, roll_number, semester,
            user:users(full_name, email),
            program:programs(name),
            department:departments(name)
          ),
          fee_structure:fee_structures(
            fee_type, amount, semester_number,
            program:programs(name)
          )
        )
      `)
      .eq("id", id)
      .single();

    if (receiptError || !receipt) {
      return NextResponse.json({
        success: false, data: null, error: "Receipt not found",
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: receipt, error: null });
  } catch (err) {
    return NextResponse.json({
      success: false, data: null,
      error: err instanceof Error ? err.message : "Internal server error",
    }, { status: 500 });
  }
}
