import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnv(".env.local");

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID?.trim();

console.log("token length:", token?.length ?? 0);
console.log("chatId:", chatId);

if (!token || !chatId) {
  console.error("Missing TELEGRAM_* in .env.local");
  process.exit(1);
}

const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then((r) =>
  r.json(),
);
console.log("getMe:", me.ok ? `@${me.result.username}` : me.description);

const send = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: "Диагностика: прямой тест API",
  }),
}).then((r) => r.json());
console.log("sendMessage:", send.ok ? "ok" : send.description);

const dbPath = path.join(process.cwd(), "data/chat.db");
if (fs.existsSync(dbPath)) {
  const db = new Database(dbPath);
  const rows = db
    .prepare(
      "SELECT id, role, text, telegram_message_id FROM messages ORDER BY id DESC LIMIT 10",
    )
    .all();
  console.log("recent DB messages:", rows);
}
