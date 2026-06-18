import fs from "fs";
import path from "path";

const credsPath = path.join(
  process.env.USERPROFILE ?? "",
  "Desktop",
  "bot_telega.txt",
);
const raw = fs.readFileSync(credsPath, "utf8").trim().split(/\r?\n/);
const token = raw[0]?.trim();
const chatId = raw[1]?.replace(/^id\s*/i, "").trim();

if (!token || !chatId) {
  console.error("Could not read token/chat id from", credsPath);
  process.exit(1);
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://baraholka-3d.vercel.app";
const webhookUrl = `${siteUrl.replace(/\/$/, "")}/api/telegram/webhook`;

const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then((r) =>
  r.json(),
);
console.log("getMe:", me.ok ? me.result.username : me);

const webhook = await fetch(
  `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`,
).then((r) => r.json());
console.log("setWebhook:", webhook);

const info = await fetch(
  `https://api.telegram.org/bot${token}/getWebhookInfo`,
).then((r) => r.json());
console.log("webhookInfo:", info.result?.url, info.result?.last_error_message ?? "");

const test = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: "✅ G3D_printing studio — чат сайта подключён. Сообщения с baraholka-3d.vercel.app будут приходить сюда. Отвечайте Reply на сообщение бота.",
  }),
}).then((r) => r.json());
console.log("testMessage:", test.ok ? "sent" : test);
