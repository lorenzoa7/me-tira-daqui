import webpush from "web-push";
import {
  getPushSubscriptions,
  removePushSubscription,
  type PushSubscriptionData,
} from "./store";
import { ptBR } from "./i18n/translations/pt-br";
import { en } from "./i18n/translations/en";
import type { TranslationKey } from "./i18n/translations/pt-br";

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const privateKey = process.env.VAPID_PRIVATE_KEY!;
const subject = process.env.VAPID_SUBJECT ?? "mailto:hello@metiradaqui.app";

webpush.setVapidDetails(subject, publicKey, privateKey);

const dictionaries: Record<string, Record<TranslationKey, string>> = {
  "pt-BR": ptBR,
  en,
};

function t(locale: string, key: TranslationKey): string {
  const dict = dictionaries[locale] ?? dictionaries["pt-BR"];
  return dict[key] ?? key;
}

export function sendPushToGroup(groupId: string) {
  const subscribers = getPushSubscriptions(groupId);
  if (subscribers.length === 0) return;

  for (const { subscription, locale } of subscribers) {
    const payload = JSON.stringify({
      title: t(locale, "notification.title"),
      body: t(locale, "notification.body"),
      url: `/grupo/${groupId}`,
    });
    sendPush(subscription, payload, groupId);
  }
}

function sendPush(
  subscription: PushSubscriptionData,
  payload: string,
  groupId: string
) {
  webpush
    .sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
      payload
    )
    .catch((err) => {
      if (err.statusCode === 410 || err.statusCode === 404) {
        removePushSubscription(groupId, subscription.endpoint);
      }
    });
}
