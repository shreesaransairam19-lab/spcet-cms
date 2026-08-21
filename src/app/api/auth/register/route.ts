import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseServerClient, getSupabaseServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, roll_number, phone, password } =
      body;

    if (!first_name || !last_name || !email || !roll_number || !password) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient();
    const admin = await getSupabaseServiceClient();

    const { data: existingStudent } = await admin
      .from("students")
      .select("id")
      .ilike("roll_number", roll_number)
      .maybeSingle();

    if (existingStudent) {
      return NextResponse.json(
        { error: "This roll number is already registered" },
        { status: 409 }
      );
    }

    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            last_name,
            full_name: `${first_name} ${last_name}`,
          },
        },
      });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 }
      );
    }

    const userId = authData.user.id;

    const { error: userError } = await admin.from("users").insert({
      id: userId,
      email,
      phone: phone || null,
      role: "student",
      is_active: true,
    });

    if (userError) {
      console.error("User insert error:", userError);
      return NextResponse.json(
        { error: "Failed to create user profile: " + userError.message },
        { status: 500 }
      );
    }

    const { data: dept } = await admin
      .from("departments")
      .select("id")
      .eq("code", "CSE")
      .single();

    const { data: prog } = await admin
      .from("programs")
      .select("id")
      .eq("code", "BTECH_CSE")
      .single();

    const { error: studentError } = await admin.from("students").insert({
      user_id: userId,
      roll_number,
      first_name,
      last_name,
      phone: phone || null,
      program_id: prog?.id || null,
      department_id: dept?.id || null,
      current_semester: 1,
      admission_date: new Date().toISOString().split("T")[0],
      batch_year: new Date().getFullYear(),
      status: "active",
    });

    if (studentError) {
      console.error("Student insert error:", studentError);
      return NextResponse.json(
        { error: "Failed to create student profile: " + studentError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      user: { id: userId, email, roll_number },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
