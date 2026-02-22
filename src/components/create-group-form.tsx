"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
      localStorage.setItem(`metiradaqui-${groupId}`, memberId);
      router.push(`/grupo/${groupId}`);
      // Don't reset loading — we're navigating away
    } catch {
      alert("Erro ao criar grupo. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Input
            placeholder="Seu nome (ex: Zezinho)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="text-center text-lg h-12"
            autoFocus
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg h-12 font-semibold gap-2"
            disabled={!name.trim() || loading}
          >
            {loading ? "Criando..." : (
              <>
                Criar grupo
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
