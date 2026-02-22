"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface VoteButtonProps {
  groupId: string;
  memberId: string;
  onVoted: () => void;
}

export function VoteButton({ groupId, memberId, onVoted }: VoteButtonProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  async function handleVote() {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/groups/${groupId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId }),
      });

      if (!res.ok) throw new Error("vote failed");

      onVoted();
    } catch {
      alert(t("vote.errorAlert"));
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={handleVote}
        disabled={loading}
        size="lg"
        className="w-full h-16 text-xl font-bold animate-pulse-glow hover:scale-[1.02] transition-transform"
      >
        {loading ? t("vote.loading") : t("vote.button")}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        {t("vote.anonymous")}
      </p>
    </motion.div>
  );
}
