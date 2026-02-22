"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

export function ClientBody({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <div className="min-h-dvh flex flex-col">
        <header className="flex justify-end gap-1 p-2 sm:p-3">
          <LanguageToggle />
          <ThemeToggle />
        </header>
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </I18nProvider>
  );
}
