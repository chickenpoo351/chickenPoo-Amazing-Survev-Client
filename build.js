const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

let targets = process.argv.slice(2);
if (!targets.length) {
  targets = ["chrome", "firefox"];
}

const distDir = "dist";
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

for (const target of targets) {
  if (!["chrome", "firefox"].includes(target)) {
    console.warn(`Skipping invalid target: ${target}`);
    continue;
  }

  const outDir = `build-${target}`;
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir);

  console.log(`\n[Build] Preparing ${target} build...`);

  fs.copyFileSync(`manifests/manifest.${target}.json`, `${outDir}/manifest.json`);

  fs.cpSync("src/.", outDir, { recursive: true });

  const outFile =
    target === "firefox"
      ? path.join(process.cwd(), "dist", "survev-client-firefox.xpi")
      : path.join(process.cwd(), "dist", "survev-client-chrome.zip");
  
  process.chdir(outDir);
  execSync(`7z a "${outFile}" *`, { stdio: "inherit" });
  process.chdir("..");
  
  console.log(`[Build] ${target} build completed: ${outFile}`);

  fs.rmSync(outDir, { recursive: true, force: true });
}

console.log("\nAll builds completed. Archives are in the 'dist/' folder.");

