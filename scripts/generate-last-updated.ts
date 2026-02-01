/**
 * Script to update last-updated dates for v3 documentation files.
 *
 * Logic:
 * 1. Loads baseline.json (created by get-v2-dates.ts as baseline).
 * 2. Scans v3 documentation files (all mdx files).
 * 3. Gets the git commit date for each v3 file (or file modification time as fallback).
 * 4. Compares with cutoff date (2026-01-15):
 *    - If v3 date > cutoff: Use v3 date (file was updated after cutoff)
 *    - If v3 date <= cutoff: Keep baseline date from baseline.json
 * 5. Writes updated dates to public/last-updated.json
 *
 * Runs automatically during: npm run build (via prebuild script)
 * Usage: npx tsx scripts/generate-last-updated.ts
 */

import { execSync } from "child_process";
import { statSync, writeFileSync, existsSync, readFileSync } from "fs";
import { resolve, basename } from "path";
import fg from "fast-glob";

// Configuration
const DATE_CUTOFF = new Date("2026-01-15T00:00:00Z");
const BASELINE_PATH = resolve(process.cwd(), "scripts/baseline.json");
const OUTPUT_PATH = resolve(process.cwd(), "public/last-updated.json");

// Types
interface LastUpdatedData {
  [filePath: string]: string;
}

/**
 * Normalize filename by removing extension, lowercasing, and removing special chars
 * Used to match v3 files with baseline dates
 */
function normalizeName(filename: string): string {
  return filename
    .replace(/\.mdx?$/, "")
    .toLowerCase()
    .replace(/[-_]/g, "");
}

/**
 * Load existing baseline.json if it exists
 * This is the baseline created by get-v2-dates.ts
 */
function loadExistingDates(): LastUpdatedData {
  try {
    if (existsSync(BASELINE_PATH)) {
      return JSON.parse(readFileSync(BASELINE_PATH, "utf-8"));
    }
  } catch (e) {
    console.warn("⚠️ Could not load existing baseline.json");
  }
  return {};
}

/**
 * Get git commit date for a file
 */
function getLocalGitDate(filePath: string): Date | null {
  try {
    const normalizedPath = filePath.replace(/\\/g, "/");
    const stdout = execSync(`git log -1 --format=%cd --date=iso-strict -- "${normalizedPath}"`, {
      encoding: "utf8",
      timeout: 5000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return stdout ? new Date(stdout) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Scanning v3 documentation files...");

  // Load existing dates (baseline from get-v2-dates.ts)
  const existingDates = loadExistingDates();
  console.log(`📂 Loaded ${Object.keys(existingDates).length} baseline dates from baseline.json.`);

  // Scan v3 files
  const v3Files = await fg("content/docs/**/*.mdx");
  console.log(`📄 Found ${v3Files.length} v3 files to process.`);

  const lastUpdated: LastUpdatedData = {};
  let stats = { updated: 0, kept: 0, new: 0 };

  for (let i = 0; i < v3Files.length; i++) {
    const v3FilePath = v3Files[i];
    const v3AbsPath = resolve(process.cwd(), v3FilePath);
    const v3FileName = basename(v3FilePath);
    const normalizedName = normalizeName(v3FileName);

    process.stdout.write(`\r⏳ Processing ${i + 1}/${v3Files.length}: ${v3FileName}...`);

    // Get v3 file's update date
    let v3Date = getLocalGitDate(v3FilePath);
    if (!v3Date) {
      v3Date = new Date(statSync(v3AbsPath).mtime);
    }

    const outKey = v3FilePath.replace(/\\/g, "/");

    // Convert v3 path to v2 path for matching baseline
    const v2Path = outKey.replace(/^content\//, "");
    const baselineKey = normalizeName(basename(v2Path));
    const baselineDate = existingDates[baselineKey];

    // Decide which date to use
    if (v3Date > DATE_CUTOFF) {
      // File was updated after cutoff, use v3 date (override baseline)
      lastUpdated[outKey] = v3Date.toISOString();
      stats.updated++;
    } else if (baselineDate) {
      // Keep baseline date if v3 file is older than cutoff
      lastUpdated[outKey] = baselineDate;
      stats.kept++;
    } else {
      // No baseline date, use v3 date
      lastUpdated[outKey] = v3Date.toISOString();
      stats.new++;
    }
  }

  process.stdout.write("\n");

  // Write output
  writeFileSync(OUTPUT_PATH, JSON.stringify(lastUpdated, null, 2));

  console.log(`\n✅ Updated last-updated.json`);
  console.log(`📊 Summary:`);
  console.log(`   - Total Files: ${v3Files.length}`);
  console.log(`   - Updated (after 2026-01-15): ${stats.updated}`);
  console.log(`   - Kept Baseline: ${stats.kept}`);
  console.log(`   - New Files (no baseline): ${stats.new}`);
  console.log(`📁 Output: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
