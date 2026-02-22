"use client";

import type { ReactNode } from "react";
import { Github } from "lucide-react";
import { I18nProvider, useTranslation } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-4 text-center text-xs text-muted-foreground/50 space-y-1">
      <p>
        {t("footer.builtWith")}{" "}
        <a
          href="https://github.com/lorenzoa7"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-muted-foreground transition-colors"
        >
          lorenzo aceti
        </a>
      </p>
      <p className="flex items-center justify-center gap-1">
        {t("footer.checkOn")}{" "}
        <a
          href="https://github.com/lorenzoa7/me-tira-daqui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline hover:text-muted-foreground transition-colors"
        >
          Github
          <Github className="h-3 w-3" />
        </a>
      </p>
    </footer>
  );
}

export function ClientBody({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <div className="min-h-dvh flex flex-col">
        <header className="flex justify-end gap-1 p-2 sm:p-3">
          <LanguageToggle />
          <ThemeToggle />
        </header>
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </div>
    </I18nProvider>
  );
}
