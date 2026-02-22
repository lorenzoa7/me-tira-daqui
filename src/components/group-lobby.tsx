"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useTranslation } from "@/lib/i18n";

interface GroupLobbyProps {
  groupId: string;
  onJoined: (memberId: string) => void;
}

export function GroupLobby({ groupId, onJoined }: GroupLobbyProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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

      if (!res.ok) throw new Error(t("lobby.error"));

      const { memberId } = await res.json();
      localStorage.setItem(`metiradaqui-${groupId}`, memberId);
      onJoined(memberId);
    } catch {
      alert(t("lobby.errorAlert"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-3">
          <Logo size="sm" />
          <p className="text-muted-foreground">
            {t("lobby.invited")}
            <br />
            {t("lobby.enterPrompt")}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("lobby.cardTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoin} className="space-y-4">
              <Input
                placeholder={t("lobby.placeholder")}
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
                {loading ? t("lobby.loading") : t("lobby.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
