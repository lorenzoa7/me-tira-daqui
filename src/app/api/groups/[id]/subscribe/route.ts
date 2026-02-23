import { NextResponse } from "next/server";
import { subscribeMember } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { memberId, subscription, locale } = body;

    if (!memberId || !subscription?.endpoint || !subscription?.keys) {
      return NextResponse.json(
        { error: "memberId and subscription are required" },
        { status: 400 }
      );
    }

    const success = subscribeMember(id, memberId, subscription, locale);
    if (!success) {
      return NextResponse.json(
        { error: "Group or member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
