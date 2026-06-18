import { Bot } from "grammy";

export function getBotToken(): string | undefined {
  return process.env.TELEGRAM_BOT_TOKEN?.trim();
}

export function getAdminChatId(): string | undefined {
  return process.env.TELEGRAM_ADMIN_CHAT_ID?.trim();
}

export function isTelegramConfigured(): boolean {
  return Boolean(getBotToken() && getAdminChatId());
}

export function getBot(): Bot {
  const token = getBotToken();
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }
  return new Bot(token);
}

export function formatVisitorMessage(sessionId: string, text: string, topic?: string): string {
  const header = `🔵 Сайт · session:${sessionId}`;
  if (topic) {
    return `${header}\n📦 ${topic}\n\n${text}`;
  }
  return `${header}\n\n${text}`;
}

export function parseSessionIdFromText(text: string): string | null {
  const match = text.match(/session:([a-zA-Z0-9-]+)/);
  return match?.[1] ?? null;
}

export async function sendToAdmin(
  sessionId: string,
  text: string,
  topic?: string,
): Promise<number | null> {
  if (!isTelegramConfigured()) return null;

  const bot = getBot();
  const chatId = getAdminChatId()!;
  const message = await bot.api.sendMessage(chatId, formatVisitorMessage(sessionId, text, topic));
  return message.message_id;
}
