import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const ENV_PATH = join(process.cwd(), ".env.local");

async function readEnvFile(): Promise<Record<string, string>> {
  try {
    const content = await readFile(ENV_PATH, "utf-8");
    const env: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        env[key] = value;
      }
    }
    return env;
  } catch {
    return {};
  }
}

async function writeEnvFile(updates: Record<string, string>): Promise<void> {
  let content = "";
  try {
    content = await readFile(ENV_PATH, "utf-8");
  } catch {
    content = "";
  }

  const lines = content.split("\n");
  const updatedKeys = new Set<string>();

  const newLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return line;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex > 0) {
      const key = trimmed.slice(0, eqIndex).trim();
      if (key in updates) {
        updatedKeys.add(key);
        return `${key}=${updates[key]}`;
      }
    }
    return line;
  });

  for (const [key, value] of Object.entries(updates)) {
    if (!updatedKeys.has(key)) {
      newLines.push(`${key}=${value}`);
    }
  }

  await writeFile(ENV_PATH, newLines.join("\n"), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { smtp_user, smtp_pass, email_from_name } = body;

    if (!smtp_user || !smtp_pass) {
      return NextResponse.json(
        { success: false, error: "Gmail address and App Password are required" },
        { status: 400 }
      );
    }

    if (!smtp_user.includes("@gmail.com")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid Gmail address" },
        { status: 400 }
      );
    }

    const cleanPassword = smtp_pass.replace(/\s/g, "");

    if (cleanPassword.length !== 16) {
      return NextResponse.json(
        {
          success: false,
          error: `App Password should be 16 characters. Got ${cleanPassword.length}. Make sure you're using an App Password, not your regular password.`,
        },
        { status: 400 }
      );
    }

    await writeEnvFile({
      SMTP_HOST: "smtp.gmail.com",
      SMTP_PORT: "587",
      SMTP_USER: smtp_user,
      SMTP_PASS: cleanPassword,
      EMAIL_FROM_NAME: email_from_name || "SPCET CMS",
      EMAIL_FROM_ADDRESS: smtp_user,
    });

    return NextResponse.json({
      success: true,
      message: "Email configuration saved. Restart the app to apply.",
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save configuration" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const env = await readEnvFile();
  return NextResponse.json({
    configured: !!(env.SMTP_USER && env.SMTP_PASS),
    smtp_user: env.SMTP_USER || "",
    email_from_name: env.EMAIL_FROM_NAME || "SPCET CMS",
  });
}
