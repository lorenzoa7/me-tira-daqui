import { NextResponse } from "next/server";
import { closeGroup } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json({ error: "memberId e obrigatorio" }, { status: 400 });
    }

    const success = closeGroup(id, memberId);
    if (!success) {
      return NextResponse.json({ error: "Apenas o host pode fechar o grupo" }, { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao fechar grupo" }, { status: 500 });
  }
}
