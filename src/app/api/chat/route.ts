export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getDb, getMessages, insertMessage } from "@/lib/db";
import { sendToAdmin } from "@/lib/telegram";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  const afterId = Number(request.nextUrl.searchParams.get("afterId") ?? "0");

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const messages = getMessages(sessionId, afterId);
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    sessionId?: string;
    text?: string;
    topic?: string;
  };

  const sessionId = body.sessionId?.trim();
  const text = body.text?.trim();
  const topic = body.topic?.trim();

  if (!sessionId || !text) {
    return NextResponse.json(
      { error: "sessionId and text required" },
      { status: 400 },
    );
  }

  const messageId = insertMessage({
    sessionId,
    role: "visitor",
    text,
  });

  let telegramConfigured = false;
  try {
    const telegramMessageId = await sendToAdmin(sessionId, text, topic);
    if (telegramMessageId) {
      telegramConfigured = true;
      getDb()
        .prepare(`UPDATE messages SET telegram_message_id = ? WHERE id = ?`)
        .run(telegramMessageId, messageId);
    }
  } catch {
    // Telegram optional in local dev without credentials
  }

  return NextResponse.json({
    ok: true,
    message: {
      id: messageId,
      sessionId,
      role: "visitor" as const,
      text,
      createdAt: Date.now(),
    },
    telegramConfigured,
  });
}
