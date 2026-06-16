import Database from "better-sqlite3";
import { Bot } from "grammy";
import fs from "fs";
import path from "path";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("Set TELEGRAM_BOT_TOKEN in .env.local");
  process.exit(1);
}

const dbPath = path.join(
  process.cwd(),
  process.env.DATABASE_PATH ?? "./data/chat.db",
);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    last_message_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    text TEXT NOT NULL,
    telegram_message_id INTEGER,
    created_at INTEGER NOT NULL
  );
`);

function parseSessionId(text) {
  const match = text.match(/session:([a-zA-Z0-9-]+)/);
  return match?.[1] ?? null;
}

function getSessionByTelegramMessageId(telegramMessageId) {
  const row = db
    .prepare(
      "SELECT session_id as sessionId FROM messages WHERE telegram_message_id = ? LIMIT 1",
    )
    .get(telegramMessageId);
  return row?.sessionId ?? null;
}

function insertAdminMessage(sessionId, text) {
  const now = Date.now();
  db.prepare(
    "INSERT INTO sessions (id, created_at, last_message_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET last_message_at = excluded.last_message_at",
  ).run(sessionId, now, now);
  db.prepare(
    "INSERT INTO messages (session_id, role, text, created_at) VALUES (?, 'admin', ?, ?)",
  ).run(sessionId, text, now);
}

const bot = new Bot(token);

bot.on("message:text", async (ctx) => {
  const reply = ctx.message.reply_to_message;
  if (!reply?.text) return;

  let sessionId = parseSessionId(reply.text);
  if (!sessionId && reply.message_id) {
    sessionId = getSessionByTelegramMessageId(reply.message_id);
  }
  if (!sessionId) return;

  insertAdminMessage(sessionId, ctx.message.text);
  await ctx.react("👍").catch(() => undefined);
});

console.log("Telegram polling started. Reply to site messages in Telegram.");
bot.start();
