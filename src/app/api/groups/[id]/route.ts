import { NextResponse } from "next/server";
import { getGroupInfo } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const memberId = url.searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json({ error: "memberId é obrigatório" }, { status: 400 });
  }

  const info = getGroupInfo(id, memberId);
  if (!info) {
    return NextResponse.json({ error: "Grupo não encontrado" }, { status: 404 });
  }

  return NextResponse.json(info);
}
