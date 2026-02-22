"use client";

import { CreateGroupForm } from "@/components/create-group-form";
import { InstallButton } from "@/components/install-button";
import { Logo } from "@/components/logo";
import { useTranslation } from "@/lib/i18n";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-2 sm:py-4">
      <div className="w-full max-w-md space-y-5 sm:space-y-8 text-center">
        <div className="space-y-2 sm:space-y-4">
          <Logo size="lg" />
          <p className="text-muted-foreground text-sm sm:text-base">
            {t("home.subtitle.line1")}
            <br />
            {t("home.subtitle.line2")}
          </p>
        </div>

        <CreateGroupForm />

        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground/60">
            {t("home.footer")}
          </p>
          <div className="flex justify-center">
            <InstallButton />
          </div>
        </div>
      </div>
    </main>
  );
}
