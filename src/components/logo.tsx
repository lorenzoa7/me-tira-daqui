"use client";

import { AutoTextSize } from "auto-text-size";
import { motion } from "motion/react";

interface LogoProps {
  size?: "lg" | "sm";
}

export function Logo({ size = "lg" }: LogoProps) {
  const lg = size === "lg";

  const maxFont = lg ? 160 : 80;
  const containerClass = lg ? "w-full max-w-xs sm:max-w-md" : "w-full max-w-[14rem]";

  return (
    <div
      className={`${containerClass} mx-auto select-none`}
      role="heading"
      aria-level={1}
      aria-label="Me Tira Daqui!"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <AutoTextSize
          mode="oneline"
          minFontSizePx={16}
          maxFontSizePx={maxFont}
        >
          <span className="block font-black uppercase leading-[0.88] tracking-tight whitespace-nowrap">
            Me Tira
          </span>
        </AutoTextSize>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        <AutoTextSize
          mode="oneline"
          minFontSizePx={16}
          maxFontSizePx={maxFont}
        >
          <span className="block font-black uppercase leading-[0.88] tracking-tight text-primary whitespace-nowrap">
            Daqui!
          </span>
        </AutoTextSize>
      </motion.div>

    </div>
  );
}
