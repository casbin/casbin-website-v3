/**
 * Script to fetch v2 repository file update dates using GitHub CLI
 * Generates a base last-updated.json file with v2 documentation file dates
 *
 * This script runs once to create the initial time baseline.
 * Then npm run build will fetch v3 file dates and update accordingly.
 *
 * Usage: npx tsx scripts/get-v2-dates.ts
 */

import { execSync } from "child_process";
import { basename, resolve } from "path";
import { writeFileSync } from "fs";

// Configuration
const V2_REPO_OWNER = "casbin";
const V2_REPO_NAME = "casbin-website-v2";
const V2_BRANCH = "master";
const OUTPUT_PATH = resolve(process.cwd(), "scripts/baseline.json");

// Types
interface V2FileInfo {
  path: string;
  normalizedName: string;
  lastUpdated: string;
}

/**
 * Normalize filename by removing extension, lowercasing, and removing special chars
 */
function normalizeName(filename: string): string {
  return filename
    .replace(/\.mdx?$/, "")
    .toLowerCase()
    .replace(/[-_]/g, "");
}

/**
 * Check if GitHub CLI is available and authenticated
 */
function isGhCliAvailable(): boolean {
  try {
    execSync("gh auth status", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Execute GitHub CLI command and parse JSON output
 */
function runGh(args: string[]): any {
  try {
    const formattedArgs = args.map((arg) => {
      if (arg.includes("&") || arg.includes("?") || arg.includes("=")) {
        return `"${arg}"`;
      }
      return arg;
    });
    const cmd = `gh ${formattedArgs.join(" ")}`;
    const output = execSync(cmd, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return JSON.parse(output);
  } catch (error) {
    return null;
  }
}

/**
 * Fetch list of all markdown files from v2 repository
 */
async function getV2FileList(): Promise<Map<string, V2FileInfo>> {
  console.log(`📡 Fetching v2 file list from ${V2_REPO_OWNER}/${V2_REPO_NAME}...`);

  const data = runGh([
    "api",
    `repos/${V2_REPO_OWNER}/${V2_REPO_NAME}/git/trees/${V2_BRANCH}?recursive=1`,
  ]);

  if (!data?.tree) {
    throw new Error("Failed to fetch v2 tree");
  }

  const fileMap = new Map<string, V2FileInfo>();

  for (const item of data.tree) {
    if (item.type === "blob" && (item.path.endsWith(".md") || item.path.endsWith(".mdx"))) {
      const name = basename(item.path);
      const normalized = normalizeName(name);
      fileMap.set(normalized, {
        path: item.path,
        normalizedName: normalized,
        lastUpdated: "",
      });
    }
  }

  console.log(`✅ Found ${fileMap.size} markdown files in v2.`);
  return fileMap;
}

/**
 * Fetch the last update date for a specific file in v2 repository
 */
async function getV2FileDate(filePath: string): Promise<Date | null> {
  try {
    const data = runGh([
      "api",
      `repos/${V2_REPO_OWNER}/${V2_REPO_NAME}/commits?path=${encodeURIComponent(filePath)}&per_page=1`,
    ]);
    if (data?.[0]?.commit?.committer?.date) {
      return new Date(data[0].commit.committer.date);
    }
  } catch (e) {
    console.warn(`Failed to fetch date for ${filePath}`);
  }
  return null;
}

/**
 * Main function to fetch all v2 file dates and save to last-updated.json
 */
async function main() {
  if (!isGhCliAvailable()) {
    console.error("❌ GitHub CLI is not installed or not authenticated.");
    console.error("Please install GitHub CLI: https://cli.github.com/");
    console.error("Then run: gh auth login");
    process.exit(1);
  }

  const v2FileMap = await getV2FileList();
  const lastUpdatedData: { [key: string]: string } = {};
  let count = 0;

  for (const [normalized, fileInfo] of v2FileMap) {
    count++;
    process.stdout.write(`\r⏳ Fetching dates ${count}/${v2FileMap.size}: ${fileInfo.path}...`);

    const date = await getV2FileDate(fileInfo.path);
    if (date) {
      lastUpdatedData[normalized] = date.toISOString();
    }
  }

  process.stdout.write("\n");

  // Write to last-updated.json
  writeFileSync(OUTPUT_PATH, JSON.stringify(lastUpdatedData, null, 2));

  console.log(`\n✅ Successfully generated ${OUTPUT_PATH}`);
  console.log(`📊 Statistics:`);
  console.log(`   - Total Files: ${Object.keys(lastUpdatedData).length}`);
  console.log(`   - Output: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
