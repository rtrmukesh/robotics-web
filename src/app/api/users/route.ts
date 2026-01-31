import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { search, role_id } = Object.fromEntries(new URL(req.url).searchParams);

    const where: Prisma.UserWhereInput = {};

    // Role filter
    if (role_id && role_id !== "0") {
      where.role_id = parseInt(role_id as string, 10);
    }

    // Search filter for name or email
    if (search && search.trim() !== "") {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
        role_id: true,
        is_active: true,
        avatar_url: true,
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
