import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

let db: Database.Database | null = null;

function getDbPath(): string {
  const configured = process.env.DATABASE_PATH?.trim();

  if (process.env.VERCEL) {
    const vercelPath = configured?.startsWith("/") ? configured : "/tmp/chat.db";
    return vercelPath;
  }

  if (configured) {
    if (path.isAbsolute(configured)) {
      return configured;
    }
    return path.join(/* turbopackIgnore: true */ process.cwd(), configured);
  }

  return path.join(/* turbopackIgnore: true */ process.cwd(), "data/chat.db");
}

export function getDb(): Database.Database {
  if (db) return db;

  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);
  if (dir !== "/tmp") {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      created_at INTEGER NOT NULL,
      last_message_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('visitor', 'admin')),
      text TEXT NOT NULL,
      telegram_message_id INTEGER,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (session_id) REFERENCES sessions(id)
    );

    CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, created_at);
  `);

  return db;
}

export function upsertSession(sessionId: string): void {
  const now = Date.now();
  getDb()
    .prepare(
      `INSERT INTO sessions (id, created_at, last_message_at)
       VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET last_message_at = excluded.last_message_at`,
    )
    .run(sessionId, now, now);
}

export function insertMessage(input: {
  sessionId: string;
  role: "visitor" | "admin";
  text: string;
  telegramMessageId?: number;
}): number {
  upsertSession(input.sessionId);
  const result = getDb()
    .prepare(
      `INSERT INTO messages (session_id, role, text, telegram_message_id, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(
      input.sessionId,
      input.role,
      input.text,
      input.telegramMessageId ?? null,
      Date.now(),
    );
  return Number(result.lastInsertRowid);
}

export function getMessages(
  sessionId: string,
  afterId = 0,
): Array<{
  id: number;
  sessionId: string;
  role: "visitor" | "admin";
  text: string;
  createdAt: number;
}> {
  return getDb()
    .prepare(
      `SELECT id, session_id as sessionId, role, text, created_at as createdAt
       FROM messages
       WHERE session_id = ? AND id > ?
       ORDER BY created_at ASC`,
    )
    .all(sessionId, afterId) as Array<{
    id: number;
    sessionId: string;
    role: "visitor" | "admin";
    text: string;
    createdAt: number;
  }>;
}

export function getSessionByTelegramMessageId(
  telegramMessageId: number,
): string | null {
  const row = getDb()
    .prepare(
      `SELECT session_id as sessionId FROM messages WHERE telegram_message_id = ? LIMIT 1`,
    )
    .get(telegramMessageId) as { sessionId: string } | undefined;
  return row?.sessionId ?? null;
}
