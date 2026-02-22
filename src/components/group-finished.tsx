"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface GroupFinishedProps {
  isClosed: boolean;
}

const CONFETTI_COLORS = [
  "#f97316", "#fb923c", "#fdba74", "#fbbf24", "#f59e0b",
  "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#ec4899",
];

export function GroupFinished({ isClosed }: GroupFinishedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiSpawned = useRef(false);

  useEffect(() => {
    if (isClosed || confettiSpawned.current) return;
    confettiSpawned.current = true;

    // Spawn confetti pieces
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor =
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDuration = `${2 + Math.random() * 3}s`;
      piece.style.animationDelay = `${Math.random() * 2}s`;
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      piece.style.width = `${6 + Math.random() * 8}px`;
      piece.style.height = `${6 + Math.random() * 8}px`;
      document.body.appendChild(piece);

      setTimeout(() => piece.remove(), 7000);
    }
  }, [isClosed]);

  if (isClosed) {
    return (
      <Card className="border-muted">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="text-5xl">👋</div>
          <h2 className="text-2xl font-bold">Grupo Encerrado</h2>
          <p className="text-muted-foreground">
            O host encerrou esse grupo. Valeu pela presenca!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div ref={containerRef}>
      <Card className="border-primary bg-primary/10">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="text-6xl animate-float">
            🎉🍺🎉
          </div>
          <h2 className="text-3xl font-bold text-primary">
            HORA DE VAZAR!
          </h2>
          <p className="text-xl text-foreground/80">
            A maioria votou - bora embora, galera!
          </p>
          <p className="text-muted-foreground text-sm">
            Pega as coisas e bora 🏃‍♂️💨
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
