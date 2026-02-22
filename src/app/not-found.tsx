"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="space-y-2">
          <p className="text-8xl font-bold text-primary/20">404</p>
          <h1 className="text-2xl font-bold">
            {t("notFound.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("notFound.description")}
          </p>
        </div>

        <p className="text-sm text-muted-foreground/50">
          {t("notFound.joke")}
        </p>

        <Button variant="secondary" className="gap-2" asChild>
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
            {t("group.backHome")}
          </a>
        </Button>
      </div>
    </main>
  );
}
