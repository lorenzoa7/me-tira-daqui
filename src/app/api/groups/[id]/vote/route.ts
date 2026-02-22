import { NextResponse } from "next/server";
import { castVote } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json({ error: "memberId é obrigatório" }, { status: 400 });
    }

    const result = castVote(id, memberId);
    if (!result.success) {
      return NextResponse.json({ error: "Voto inválido" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao votar" }, { status: 500 });
  }
}
