"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VoteButtonProps {
  groupId: string;
  memberId: string;
  onVoted: () => void;
}

export function VoteButton({ groupId, memberId, onVoted }: VoteButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleVote() {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/groups/${groupId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId }),
      });

      if (!res.ok) throw new Error("Erro ao votar");

      onVoted();
    } catch {
      alert("Erro ao registrar voto. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleVote}
        disabled={loading}
        size="lg"
        className="w-full h-16 text-xl font-bold animate-pulse-glow hover:scale-[1.02] transition-transform"
      >
        {loading ? "Votando..." : "🏃 ME TIRA DAQUI!"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Voto anônimo — ninguém vai saber que foi você 🤫
      </p>
    </div>
  );
}
