// app/api/auth/callback/route.ts
import { createClientFromServer } from "@/src/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  
  // Vercel env variable அல்லது origin-ஐ எடுக்கவும்
  const redirectTo = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  if (code) {
    const supabase = await createClientFromServer(); 
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(redirectTo); // இங்கே மாற்றவும்
    }
  }

  return NextResponse.redirect(redirectTo); // எர்ரர் வந்தாலும் சரியான URL-க்கு செல்லும்
}