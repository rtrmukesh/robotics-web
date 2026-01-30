import Role from "@/src/helper/Role";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await prisma.user.upsert({
      where: { auth_id: body.auth_id },
      update: {
        email: body.email,
        name: body.name,
        avatar_url: body.avatar_url,
      },
      create: {
        auth_id: body.auth_id,
        email: body.email,
        name: body.name,
        avatar_url: body.avatar_url,
        role_id: Role.USER,
        is_active: true,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ success: false, error: "Failed to sync user" });
  }
}
