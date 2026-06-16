export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Bot, webhookCallback } from "grammy";
import {
  getSessionByTelegramMessageId,
  insertMessage,
} from "@/lib/db";
import { getBotToken, parseSessionIdFromText } from "@/lib/telegram";

function createBot(): Bot {
  const token = getBotToken();
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const bot = new Bot(token);

  bot.on("message:text", async (ctx) => {
    const reply = ctx.message.reply_to_message;
    if (!reply?.text) return;

    let sessionId = parseSessionIdFromText(reply.text);
    if (!sessionId && reply.message_id) {
      sessionId = getSessionByTelegramMessageId(reply.message_id);
    }
    if (!sessionId) return;

    insertMessage({
      sessionId,
      role: "admin",
      text: ctx.message.text,
    });

    await ctx.react("👍").catch(() => undefined);
  });

  return bot;
}

export async function POST(request: Request) {
  if (!getBotToken()) {
    return new Response("Telegram not configured", { status: 503 });
  }

  const bot = createBot();
  const handler = webhookCallback(bot, "std/http");
  return handler(request);
}
