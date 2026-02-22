"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupLobbyProps {
  groupId: string;
  onJoined: (memberId: string) => void;
}

export function GroupLobby({ groupId, onJoined }: GroupLobbyProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) throw new Error("Erro ao entrar");

      const { memberId } = await res.json();
      localStorage.setItem(`metiradaqui-${groupId}`, memberId);
      onJoined(memberId);
    } catch {
      alert("Erro ao entrar no grupo. O grupo pode nao existir ou ja ter sido encerrado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">🍺 Me Tira Daqui!</h1>
          <p className="text-muted-foreground">
            Voce foi convidado pra um grupo.
            <br />
            Coloca seu nome pra entrar no role!
          </p>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Entrar no Grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoin} className="space-y-4">
              <Input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="text-center text-lg h-12"
                autoFocus
              />
              <Button
                type="submit"
                size="lg"
                className="w-full text-lg h-12 font-semibold"
                disabled={!name.trim() || loading}
              >
                {loading ? "Entrando..." : "Entrar no Role 🍻"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
