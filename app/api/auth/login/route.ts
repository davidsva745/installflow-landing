import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  const expectedEmail = process.env.DEMO_LOGIN_EMAIL ?? "demo@installflow.cz";
  const expectedPassword = process.env.DEMO_LOGIN_PASSWORD ?? "demo1234";

  if (email !== expectedEmail || password !== expectedPassword) {
    return NextResponse.json(
      { message: "Neplatný e-mail nebo heslo." },
      { status: 401 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("installflow_session", "demo-session", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}
