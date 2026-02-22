"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { GroupLobby } from "@/components/group-lobby";
import { VoteButton } from "@/components/vote-button";
import { VoteSubmitted } from "@/components/vote-submitted";
import { GroupFinished } from "@/components/group-finished";
import { ShareLink } from "@/components/share-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupInfo {
  memberCount: number;
  members: string[];
  hasVoted: boolean;
  isFinished: boolean;
  isClosed: boolean;
  isHost: boolean;
}

export default function GroupPage() {
  const params = useParams();
  const groupId = params.id as string;

  const [memberId, setMemberId] = useState<string | null>(null);
  const [info, setInfo] = useState<GroupInfo | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [closingGroup, setClosingGroup] = useState(false);
  const notificationPermissionAsked = useRef(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchInfo = useCallback(
    async (mid: string) => {
      try {
        const res = await fetch(
          `/api/groups/${groupId}?memberId=${mid}`
        );
        if (!res.ok) {
          if (res.status === 404) setNotFound(true);
          return;
        }
        const data: GroupInfo = await res.json();
        setInfo(data);
        setHasVoted(data.hasVoted);
        setIsFinished(data.isFinished);
        setIsClosed(data.isClosed);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    },
    [groupId]
  );

  // Check localStorage for existing memberId
  useEffect(() => {
    const stored = localStorage.getItem(`metiradaqui-${groupId}`);
    if (stored) {
      setMemberId(stored);
      fetchInfo(stored);
    } else {
      setLoading(false);
    }
  }, [groupId, fetchInfo]);

  // Request notification permission
  useEffect(() => {
    if (memberId && !notificationPermissionAsked.current) {
      notificationPermissionAsked.current = true;
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [memberId]);

  // SSE connection
  useEffect(() => {
    if (!memberId) return;

    const es = new EventSource(
      `/api/groups/${groupId}/events?memberId=${memberId}`
    );
    eventSourceRef.current = es;

    es.addEventListener("member-joined", (e) => {
      const data = JSON.parse(e.data);
      setInfo((prev) =>
        prev ? { ...prev, memberCount: data.memberCount, members: data.members } : prev
      );
    });

    es.addEventListener("vote-cast", () => {
      // We don't show vote count to preserve anonymity, but we refetch to update state
      fetchInfo(memberId);
    });

    es.addEventListener("time-to-leave", () => {
      setIsFinished(true);
      // Fire browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("🍺 Me Tira Daqui!", {
          body: "Hora de vazar, galera! A maioria votou pra ir embora!",
          icon: "/favicon.ico",
        });
      }
    });

    es.addEventListener("group-closed", () => {
      setIsClosed(true);
      es.close();
    });

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [memberId, groupId, fetchInfo]);

  function handleJoined(mid: string) {
    setMemberId(mid);
    fetchInfo(mid);
  }

  function handleVoted() {
    setHasVoted(true);
  }

  async function handleCloseGroup() {
    if (!memberId || closingGroup) return;
    setClosingGroup(true);
    try {
      await fetch(`/api/groups/${groupId}/close`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId }),
      });
    } catch {
      alert("Erro ao fechar grupo.");
    } finally {
      setClosingGroup(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-float">🍺</div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </main>
    );
  }

  // Not found
  if (notFound) {
    return (
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="text-4xl">😕</div>
          <h2 className="text-xl font-semibold">Grupo nao encontrado</h2>
          <p className="text-muted-foreground">
            Esse grupo nao existe ou ja expirou.
          </p>
          <a href="/" className="text-primary underline">
            Voltar pro inicio
          </a>
        </div>
      </main>
    );
  }

  // Not joined yet - show lobby
  if (!memberId) {
    return <GroupLobby groupId={groupId} onJoined={handleJoined} />;
  }

  // Closed group
  if (isClosed) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <GroupFinished isClosed={true} />
        </div>
      </main>
    );
  }

  // Majority reached - time to leave!
  if (isFinished) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <GroupFinished isClosed={false} />
          {info?.isHost && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCloseGroup}
              disabled={closingGroup}
            >
              {closingGroup ? "Encerrando..." : "Encerrar Grupo 👋"}
            </Button>
          )}
        </div>
      </main>
    );
  }

  // Main group view (joined, can vote or already voted)
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">🍺 Me Tira Daqui!</h1>
          <Badge variant="secondary" className="text-sm">
            {info?.memberCount ?? "..."} no role
          </Badge>
        </div>

        <ShareLink groupId={groupId} />

        {/* Members list */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Quem ta no role:
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {info?.members.map((name, i) => (
              <Badge key={i} variant="outline" className="text-sm">
                {name}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Vote or waiting state */}
        {hasVoted ? (
          <VoteSubmitted />
        ) : (
          <VoteButton
            groupId={groupId}
            memberId={memberId}
            onVoted={handleVoted}
          />
        )}

        {/* Host controls */}
        {info?.isHost && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={handleCloseGroup}
            disabled={closingGroup}
          >
            {closingGroup ? "Encerrando..." : "Encerrar grupo"}
          </Button>
        )}
      </div>
    </main>
  );
}
