#!/usr/bin/env tsx
/**
 * Build-time script to generate last-updated dates for all documentation files.
 * 
 * Logic:
 * 1. CHECKS if running in Vercel/CI environment (using Env Vars).
 *    - If Vercel: SKIPS generation and logs a message (uses existing public/last-updated.json).
 *    - If Local: PROCEEDS to generate fresh dates.
 * 
 * 2. Tries to use `gh` CLI first (Local Development).
 * 3. Falls back to `fetch` with `GITHUB_TOKEN` (Legacy/Backup).
 * 4. Matches v3 files with v2 files using "fuzzy" normalization.
 * 5. Compares dates: if v3 date > 2026-01-15, use v3; otherwise use v2.
 * 
 * Usage: npx tsx scripts/generate-last-updated.ts
 */

import { execSync } from 'child_process';
import { statSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import fg from 'fast-glob';

// Configuration
const V2_REPO_OWNER = 'casbin';
const V2_REPO_NAME = 'casbin-website-v2';
const V2_BRANCH = 'master';
const DATE_CUTOFF = new Date('2026-01-15T00:00:00Z');

// Types
interface LastUpdatedData {
  [filePath: string]: string;
}

interface GhTreeItem {
  path: string;
  type: string;
}

// Check if running in Vercel
// Vercel sets 'VERCEL' environment variable to '1'
const IS_VERCEL = process.env.VERCEL === '1';

// --- Strategy 1: GH CLI (Local) ---

function isGhCliAvailable(): boolean {
  try {
    execSync('gh auth status', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function runGh(args: string[]): any {
  try {
    const formattedArgs = args.map(arg => {
      if (arg.includes('&') || arg.includes('?') || arg.includes('=')) {
        return `"${arg}"`;
      }
      return arg;
    });
    const cmd = `gh ${formattedArgs.join(' ')}`;
    const output = execSync(cmd, { 
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'] 
    }).trim();
    return JSON.parse(output);
  } catch (error) {
    return null;
  }
}

// --- Strategy 2: Fetch API (Vercel/CI) ---

async function githubFetch(url: string): Promise<any> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'casbin-website-v3-script',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(`Rate limit exceeded (403). Set GITHUB_TOKEN in Vercel.`);
    }
    throw new Error(`GitHub API Error: ${response.status}`);
  }

  return response.json();
}

// --- Core Logic ---

async function getV2FileMap(useGh: boolean): Promise<Map<string, string>> {
  console.log(`📡 Fetching v2 file list via ${useGh ? 'GH CLI' : 'GitHub API'}...`);
  
  let treeItems: GhTreeItem[] = [];

  if (useGh) {
    const data = runGh(['api', `repos/${V2_REPO_OWNER}/${V2_REPO_NAME}/git/trees/${V2_BRANCH}?recursive=1`]);
    if (data?.tree) treeItems = data.tree;
  } else {
    const url = `https://api.github.com/repos/${V2_REPO_OWNER}/${V2_REPO_NAME}/git/trees/${V2_BRANCH}?recursive=1`;
    const data = await githubFetch(url);
    if (data?.tree) treeItems = data.tree;
  }

  const fileMap = new Map<string, string>(); 
  
  for (const item of treeItems) {
    if (item.type === 'blob' && (item.path.endsWith('.md') || item.path.endsWith('.mdx'))) {
      const name = basename(item.path);
      const normalized = normalizeName(name);
      fileMap.set(normalized, item.path);
    }
  }
  
  console.log(`✅ Indexed ${fileMap.size} files from v2.`);
  return fileMap;
}

async function getV2FileDate(filePath: string, useGh: boolean): Promise<Date | null> {
  try {
    if (useGh) {
      const data = runGh(['api', `repos/${V2_REPO_OWNER}/${V2_REPO_NAME}/commits?path=${encodeURIComponent(filePath)}&per_page=1`]);
      if (data?.[0]?.commit?.committer?.date) {
        return new Date(data[0].commit.committer.date);
      }
    } else {
      const url = `https://api.github.com/repos/${V2_REPO_OWNER}/${V2_REPO_NAME}/commits?path=${encodeURIComponent(filePath)}&page=1&per_page=1`;
      const data = await githubFetch(url);
      if (data?.[0]?.commit?.committer?.date) {
        return new Date(data[0].commit.committer.date);
      }
    }
  } catch (e) {
    console.warn(`⚠️ Failed to fetch v2 date for ${filePath}:`, e);
  }
  return null;
}

function normalizeName(filename: string): string {
  return filename
    .replace(/\.mdx?$/, '')
    .toLowerCase()
    .replace(/[-_]/g, '');
}

function getLocalGitDate(filePath: string): Date | null {
  try {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const stdout = execSync(`git log -1 --format=%cd --date=iso-strict -- "${normalizedPath}"`, {
      encoding: 'utf8',
      timeout: 2000,
      stdio: ['ignore', 'pipe', 'ignore'] // suppress stderr
    }).trim();
    return stdout ? new Date(stdout) : null;
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log('🚀 Checking environment...');
  
  // SKIP IF VERCEL
  if (IS_VERCEL) {
    console.log('🛑 Vercel environment detected.');
    console.log('⏩ Skipping last-updated date generation.');
    console.log('📂 Existing public/last-updated.json will be used.');
    
    const jsonPath = resolve(process.cwd(), 'public/last-updated.json');
    if (!existsSync(jsonPath)) {
        console.warn('⚠️ Warning: public/last-updated.json does not exist! Dates might be missing.');
        // Fallback: generate a basic one just using local file mtime to avoid crash?
        // But user asked to "use generated json", so assuming it is committed.
    }
    return; 
  }

  // --- LOCAL EXECUTION ---
  const useGh = isGhCliAvailable();
  console.log(`🔄 Local environment detected. Starting script (${useGh ? 'Local GH CLI Mode' : 'API Mode'})...`);
  
  if (!useGh && !process.env.GITHUB_TOKEN) {
    console.warn('⚠️  Warning: Running in API Mode without GITHUB_TOKEN. You will likely hit rate limits.');
  }

  // 1. Get V2 Map
  let v2Map = new Map<string, string>();
  try {
    v2Map = await getV2FileMap(useGh);
  } catch (e: any) {
    console.error(`❌ Critical: Failed to fetch v2 file list. ${e.message}`);
    throw e;
  }
  
  // 2. Scan V3 Files
  console.log('🔍 Scanning v3 documentation files...');
  const v3Files = await fg('content/docs/**/*.mdx');
  console.log(`📄 Found ${v3Files.length} files in current project.`);

  const lastUpdated: LastUpdatedData = {};
  let stats = { updated: 0, legacy: 0, missing: 0 };

  for (let i = 0; i < v3Files.length; i++) {
    const v3FilePath = v3Files[i];
    const v3AbsPath = resolve(process.cwd(), v3FilePath);
    const v3FileName = basename(v3FilePath);
    const normalizedName = normalizeName(v3FileName);

    process.stdout.write(`\r⏳ Processing ${i + 1}/${v3Files.length}: ${v3FileName}...`);

    let v3Date = getLocalGitDate(v3FilePath);
    if (!v3Date) {
      v3Date = new Date(statSync(v3AbsPath).mtime);
    }

    let finalDate = v3Date;

    // Check V2 Match
    const v2Path = v2Map.get(normalizedName);
    
    if (v2Path) {
      const v2Date = await getV2FileDate(v2Path, useGh);
      
      if (v2Date) {
        if (v3Date > DATE_CUTOFF) {
          finalDate = v3Date;
          stats.updated++;
        } else {
          finalDate = v2Date;
          stats.legacy++;
        }
      } else {
        stats.missing++;
      }
    } else {
      stats.missing++;
    }

    const outKey = v3FilePath.replace(/\\/g, "/");
    lastUpdated[outKey] = finalDate.toISOString();
    
    if (!useGh) await new Promise(r => setTimeout(r, 100));
  }
  
  process.stdout.write('\n');

  // Write output
  const outputPath = resolve(process.cwd(), 'public/last-updated.json');
  writeFileSync(outputPath, JSON.stringify(lastUpdated, null, 2));

  console.log(`\n✅ Generated last-updated.json`);
  console.log(`📊 Summary:`);
  console.log(`   - Total Files: ${v3Files.length}`);
  console.log(`   - Kept Legacy (v2) Date: ${stats.legacy}`);
  console.log(`   - Used New (v3) Date: ${stats.updated}`);
  console.log(`   - No v2 Match/API Fail (used v3): ${stats.missing}`);
}

main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
