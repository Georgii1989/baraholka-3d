import fs from "fs";
import { execSync } from "child_process";
import path from "path";

const credsPath = path.join(
  process.env.USERPROFILE ?? "",
  "Desktop",
  "bot_telega.txt",
);
const raw = fs.readFileSync(credsPath, "utf8").trim().split(/\r?\n/);
const token = raw[0]?.trim();
const chatId = raw[1]?.replace(/^id\s*/i, "").trim();

if (!token || !chatId) {
  console.error("Missing credentials in", credsPath);
  process.exit(1);
}

const tmpDir = fs.mkdtempSync(path.join(process.cwd(), ".tmp-env-"));
function writeAndAdd(name, value, env = "production") {
  const file = path.join(tmpDir, name);
  fs.writeFileSync(file, value, "utf8");
  execSync(`vercel env add ${name} ${env} --force < "${file}"`, {
    stdio: "inherit",
    shell: "cmd.exe",
  });
}

console.log("Updating Vercel env (trimmed, no newlines)...");
writeAndAdd("TELEGRAM_BOT_TOKEN", token);
writeAndAdd("TELEGRAM_ADMIN_CHAT_ID", chatId);
writeAndAdd("DATABASE_PATH", "/tmp/chat.db");
fs.rmSync(tmpDir, { recursive: true, force: true });
console.log("Done. Redeploy with: vercel --prod --yes");
