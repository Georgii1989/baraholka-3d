import config from "../../../../../keystatic.config";

function githubKeystaticReady() {
  if (!process.env.KEYSTATIC_GITHUB_REPO) return true;
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );
}

async function getHandlers() {
  const { makeRouteHandler } = await import("@keystatic/next/route-handler");
  return makeRouteHandler({ config });
}

export async function GET(request: Request) {
  if (!githubKeystaticReady()) {
    return Response.json(
      { error: "Keystatic GitHub App is not configured yet." },
      { status: 503 },
    );
  }

  const { GET: handler } = await getHandlers();
  return handler(request);
}

export async function POST(request: Request) {
  if (!githubKeystaticReady()) {
    return Response.json(
      { error: "Keystatic GitHub App is not configured yet." },
      { status: 503 },
    );
  }

  const { POST: handler } = await getHandlers();
  return handler(request);
}
