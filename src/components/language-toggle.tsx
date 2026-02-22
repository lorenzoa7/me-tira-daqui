"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

function BrazilFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#229e45" d="M0 0h640v480H0z" />
      <path fill="#f8e509" d="m321.4 36.2 301.5 203.7-301.5 204.1L18.6 239.9z" />
      <circle fill="#2b49a3" cx="321.4" cy="240" r="115" />
      <path
        fill="#fff"
        d="M195.6 272.6c-5-18.2-6.5-37.3-4-56a165 165 0 0 1 256.3-7.8c-31-2-116.4-7.6-252.3 63.8z"
      />
    </svg>
  );
}

function USFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#bd3d44" d="M0 0h640v37h-640zm0 74h640v37h-640zm0 148h640v37h-640zm0 148h640v37h-640zm0-222h640v37h-640zm0 148h640v37h-640zm0 148h640v37h-640z" />
      <path fill="#fff" d="M0 37h640v37h-640zm0 148h640v37h-640zm0 148h640v37h-640zm0-222h640v37h-640zm0 148h640v37h-640zm0 148h640v37h-640z" />
      <path fill="#192f5d" d="M0 0h260v259H0z" />
    </svg>
  );
}

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggle() {
    setLocale(locale === "pt-BR" ? "en" : "pt-BR");
  }

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"
    >
      {locale === "pt-BR" ? (
        <BrazilFlag className="h-4 w-6 rounded-[2px]" />
      ) : (
        <USFlag className="h-4 w-6 rounded-[2px]" />
      )}
    </Button>
  );
}
