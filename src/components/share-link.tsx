"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ShareLinkProps {
  groupId: string;
}

export function ShareLink({ groupId }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const link = typeof window !== "undefined"
    ? `${window.location.origin}/grupo/${groupId}`
    : `/grupo/${groupId}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Me Tira Daqui! 🍺",
          text: "Entra no grupo pra gente decidir quando vazar!",
          url: link,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="pt-4 space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Compartilhe o link com a galera:
        </p>
        <div className="flex gap-2">
          <code className="flex-1 bg-background rounded-md px-3 py-2 text-sm truncate border">
            {link}
          </code>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? "Copiado! ✓" : "Copiar"}
          </Button>
        </div>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleShare}
          >
            Compartilhar 📤
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
