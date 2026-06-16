import config from "../../../../../keystatic.config";

async function getHandlers() {
  const { makeRouteHandler } = await import("@keystatic/next/route-handler");
  return makeRouteHandler({ config });
}

export async function GET(request: Request) {
  const { GET: handler } = await getHandlers();
  return handler(request);
}

export async function POST(request: Request) {
  const { POST: handler } = await getHandlers();
  return handler(request);
}
