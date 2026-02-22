"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllFunnyMessages } from "@/lib/funny-messages";
import { useTranslation } from "@/lib/i18n";

export function VoteSubmitted() {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const messages = getAllFunnyMessages(t);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, [t]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Card>
        <CardContent className="pt-6 text-center space-y-4">
          <h2 className="text-lg font-semibold">{t("voteSubmitted.title")}</h2>
          <p className="text-muted-foreground">{message}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            {t("voteSubmitted.waiting")}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
