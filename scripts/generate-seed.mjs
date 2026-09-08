// Regenerates netlify/functions/seed-content.json from src/lib/defaultContent.js
// Run with: node scripts/generate-seed.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { DEFAULT_CONTENT } from "../src/lib/defaultContent.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../netlify/functions/seed-content.json");
writeFileSync(outPath, JSON.stringify(DEFAULT_CONTENT, null, 2) + "\n");
console.log("Wrote", outPath);
