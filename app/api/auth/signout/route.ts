import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut({ redirect: false });

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set('authjs.session-token', '', {
      maxAge: 0,
      path: '/',
    });

    response.cookies.set('__Secure-authjs.session-token', '', {
      maxAge: 0,
      path: '/',
      secure: true,
    });

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
