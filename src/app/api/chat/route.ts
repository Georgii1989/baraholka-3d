export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import { getDb, getMessages, insertMessage } from "@/lib/db";
import { sendToAdmin } from "@/lib/telegram";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    const afterId = Number(request.nextUrl.searchParams.get("afterId") ?? "0");

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const messages = getMessages(sessionId, afterId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("[chat] GET failed:", error);
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
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
  let telegramError: string | null = null;
  try {
    const telegramMessageId = await sendToAdmin(sessionId, text, topic);
    if (telegramMessageId) {
      telegramConfigured = true;
      getDb()
        .prepare(`UPDATE messages SET telegram_message_id = ? WHERE id = ?`)
        .run(telegramMessageId, messageId);
    } else {
      telegramError = "Telegram not configured";
    }
  } catch (error) {
    telegramError =
      error instanceof Error ? error.message : "Telegram send failed";
    console.error("[chat] Telegram send failed:", telegramError);
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
    telegramError:
      process.env.NODE_ENV === "development" ? telegramError : undefined,
  });
  } catch (error) {
    console.error("[chat] POST failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Chat server error",
      },
      { status: 500 },
    );
  }
}
