import type { TranslationKey } from "./i18n/translations/pt-br";

const FUNNY_COUNT = 15;

const funnyKeys: TranslationKey[] = Array.from(
  { length: FUNNY_COUNT },
  (_, i) => `funny.${i}` as TranslationKey
);

export function getRandomFunnyMessage(t: (key: TranslationKey) => string): string {
  const key = funnyKeys[Math.floor(Math.random() * funnyKeys.length)];
  return t(key);
}

export function getAllFunnyMessages(t: (key: TranslationKey) => string): string[] {
  return funnyKeys.map((key) => t(key));
}
