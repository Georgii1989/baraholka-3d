import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env");
if (!existsSync(envPath)) {
  console.error("Файл .env не найден. Пройдите http://localhost:3000/keystatic/setup");
  process.exit(1);
}

const raw = readFileSync(envPath, "utf8");
const vars = {};
for (const line of raw.split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (!m) continue;
  vars[m[1]] = m[2].replace(/^"|"$/g, "").trim();
}

const required = [
  "KEYSTATIC_GITHUB_CLIENT_ID",
  "KEYSTATIC_GITHUB_CLIENT_SECRET",
  "KEYSTATIC_SECRET",
  "NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",
];

for (const key of required) {
  if (!vars[key]) {
    console.error(`В .env нет ${key}`);
    process.exit(1);
  }
}

function addEnv(name, value, env, sensitive = false) {
  const args = ["vercel", "env", "add", name, env, "--force"];
  if (sensitive) args.push("--sensitive");
  args.push("-y");
  execFileSync("npx", args, {
    input: value,
    stdio: ["pipe", "inherit", "inherit"],
    cwd: process.cwd(),
    shell: true,
  });
}

for (const env of ["production", "preview"]) {
  addEnv("KEYSTATIC_GITHUB_CLIENT_ID", vars.KEYSTATIC_GITHUB_CLIENT_ID, env, true);
  addEnv("KEYSTATIC_GITHUB_CLIENT_SECRET", vars.KEYSTATIC_GITHUB_CLIENT_SECRET, env, true);
  addEnv("KEYSTATIC_SECRET", vars.KEYSTATIC_SECRET, env, true);
  addEnv(
    "NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",
    vars.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
    env,
  );
}

console.log("Keystatic env добавлены в Vercel (production + preview).");
