import { NextResponse } from "next/server";
import { createGroup } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hostName } = body;

    if (!hostName || typeof hostName !== "string" || hostName.trim().length === 0) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
    }

    if (hostName.trim().length > 30) {
      return NextResponse.json({ error: "Nome muito longo" }, { status: 400 });
    }

    const { groupId, memberId } = createGroup(hostName.trim());

    return NextResponse.json({ groupId, memberId });
  } catch {
    return NextResponse.json({ error: "Erro ao criar grupo" }, { status: 500 });
  }
}
