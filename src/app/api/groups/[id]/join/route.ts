import { NextResponse } from "next/server";
import { joinGroup } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Nome e obrigatorio" }, { status: 400 });
    }

    if (name.trim().length > 30) {
      return NextResponse.json({ error: "Nome muito longo" }, { status: 400 });
    }

    const result = joinGroup(id, name.trim());
    if (!result) {
      return NextResponse.json({ error: "Grupo nao encontrado ou ja encerrado" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erro ao entrar no grupo" }, { status: 500 });
  }
}
