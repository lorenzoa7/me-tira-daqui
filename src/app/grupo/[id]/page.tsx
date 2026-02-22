"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GroupLobby } from "@/components/group-lobby";
import { VoteButton } from "@/components/vote-button";
import { VoteSubmitted } from "@/components/vote-submitted";
import { GroupFinished } from "@/components/group-finished";
import { ShareLink } from "@/components/share-link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";

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

  useEffect(() => {
    const stored = localStorage.getItem(`metiradaqui-${groupId}`);
    if (stored) {
      setMemberId(stored);
      fetchInfo(stored);
    } else {
      setLoading(false);
    }
  }, [groupId, fetchInfo]);

  useEffect(() => {
    if (memberId && !notificationPermissionAsked.current) {
      notificationPermissionAsked.current = true;
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [memberId]);

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
      fetchInfo(memberId);
    });

    es.addEventListener("time-to-leave", () => {
      setIsFinished(true);
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("🍻 Me Tira Daqui!", {
          body: "Hora de vazar, galera! A maioria votou pra ir embora!",
          icon: "/favicon.svg",
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

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center p-4">
        <p className="text-muted-foreground">Carregando...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Grupo não encontrado 😕</h2>
          <p className="text-muted-foreground">
            Esse grupo não existe ou já expirou.
          </p>
          <Button variant="secondary" size="sm" className="gap-2" asChild>
            <a href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </a>
          </Button>
        </div>
      </main>
    );
  }

  if (!memberId) {
    return <GroupLobby groupId={groupId} onJoined={handleJoined} />;
  }

  if (isClosed) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <GroupFinished isClosed={true} />
        </div>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <GroupFinished isClosed={false} />
          {info?.isHost && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
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

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            {info?.memberCount ?? "..."} no rolê
          </p>
        </div>

        <ShareLink groupId={groupId} />

        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground font-medium mb-2">
              Quem tá no rolê
            </p>
            <div className="space-y-1.5">
              {info?.members.map((name, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-muted/50 rounded-md text-sm"
                >
                  {name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {hasVoted ? (
          <VoteSubmitted />
        ) : (
          <VoteButton
            groupId={groupId}
            memberId={memberId}
            onVoted={handleVoted}
          />
        )}

        {info?.isHost && (
          <div className="text-center pt-2">
            <button
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              onClick={handleCloseGroup}
              disabled={closingGroup}
            >
              {closingGroup ? "Encerrando..." : "Encerrar grupo"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
