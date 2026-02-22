"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface GroupFinishedProps {
  isClosed: boolean;
}

const CONFETTI_COLORS = [
  "#f97316", "#fb923c", "#fdba74", "#fbbf24", "#f59e0b",
  "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#ec4899",
];

export function GroupFinished({ isClosed }: GroupFinishedProps) {
  const confettiSpawned = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isClosed || confettiSpawned.current) return;
    confettiSpawned.current = true;

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
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-bold">{t("finished.closed.title")}</h2>
            <p className="text-muted-foreground">
              {t("finished.closed.description")}
            </p>
          </CardContent>
        </Card>
        <Button variant="secondary" className="w-full gap-2" asChild>
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
            {t("group.backHome")}
          </a>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      <Card className="border-primary bg-primary/10">
        <CardContent className="pt-8 pb-8 text-center space-y-3">
          <motion.p
            className="text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
          >
            🎉🍻🎉
          </motion.p>
          <motion.h2
            className="text-3xl font-black uppercase text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {t("finished.heading")}
          </motion.h2>
          <p className="text-lg text-foreground/80">
            {t("finished.majority")}
          </p>
          <p className="text-muted-foreground text-sm">
            {t("finished.gogogo")}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
