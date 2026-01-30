// app/api/auth/callback/route.ts
import { createClientFromServer } from "@/src/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = await createClientFromServer(); 
    
    // Auth code-ah session-ah mathunga
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Session set aanathum, `/` route-ku redirect pannunga
      return NextResponse.redirect(origin);
    }
  }

  // Error naalum `/` ke poga sollalam
  return NextResponse.redirect(origin);
}