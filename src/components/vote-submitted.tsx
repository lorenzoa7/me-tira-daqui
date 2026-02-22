"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllFunnyMessages } from "@/lib/funny-messages";

export function VoteSubmitted() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messages = getAllFunnyMessages();
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <Card>
      <CardContent className="pt-6 text-center space-y-4">
        <h2 className="text-lg font-semibold">Voto registrado! 🗳️</h2>
        <p className="text-muted-foreground">{message}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          Aguardando a galera decidir...
        </div>
      </CardContent>
    </Card>
  );
}
