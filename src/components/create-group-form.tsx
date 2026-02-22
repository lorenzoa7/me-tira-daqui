"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function CreateGroupForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostName: name.trim() }),
      });

      if (!res.ok) throw new Error("Erro ao criar grupo");

      const { groupId, memberId } = await res.json();

      // Store memberId in localStorage
      localStorage.setItem(`metiradaqui-${groupId}`, memberId);

      router.push(`/grupo/${groupId}`);
    } catch {
      alert("Erro ao criar grupo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Seu nome (ex: Zezinho)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="text-center text-lg h-12"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg h-12 font-semibold"
            disabled={!name.trim() || loading}
          >
            {loading ? "Criando..." : "Criar Grupo 🍻"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
