import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";

function run(args, input) {
  execFileSync("npx", args, {
    input,
    stdio: ["pipe", "inherit", "inherit"],
    cwd: process.cwd(),
    shell: true,
  });
}

function rm(name, env) {
  try {
    run(["vercel", "env", "rm", name, env, "-y"]);
  } catch {
    // already removed
  }
}

function add(name, value, env, sensitive = false) {
  const args = ["vercel", "env", "add", name, env, "-y"];
  if (sensitive) args.push("--sensitive");
  run(args, value);
}

const secret = randomBytes(32).toString("hex");

for (const env of ["production", "preview"]) {
  rm("KEYSTATIC_GITHUB_REPO", env);
  rm("KEYSTATIC_SECRET", env);
  rm("NEXT_PUBLIC_SITE_URL", env);
}

for (const env of ["production", "preview"]) {
  add("KEYSTATIC_GITHUB_REPO", "Georgii1989/baraholka-3d", env);
  add("KEYSTATIC_SECRET", secret, env, true);
}

add("NEXT_PUBLIC_SITE_URL", "https://baraholka-3d.vercel.app", "production");
add("NEXT_PUBLIC_SITE_URL", "https://baraholka-3d.vercel.app", "preview");

console.log("Vercel env fixed.");
