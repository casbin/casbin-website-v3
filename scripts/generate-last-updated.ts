#!/usr/bin/env tsx
/**
 * Build-time script to generate last-updated dates for all documentation files.
 * This avoids calling git at runtime, significantly improving page load performance.
 * 
 * Usage: npx tsx scripts/generate-last-updated.ts
 * 
 * Output: public/last-updated.json
 * Format: { "docs/getting-started.mdx": "2024-01-15T10:30:00.000Z", ... }
 */

import { execSync } from 'child_process';
import { readFileSync, statSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import fg from 'fast-glob';

interface LastUpdatedData {
  [filePath: string]: string;
}

async function main() {
  console.log('🔍 Scanning for documentation files...');
  
  // Find all MDX files in content/docs
  const docsPattern = 'content/docs/**/*.mdx';
  const files = await fg(docsPattern);
  
  console.log(`📄 Found ${files.length} documentation files`);
  
  const lastUpdated: LastUpdatedData = {};
  
  for (let filePath of files) {
    try {
      const absolutePath = resolve(process.cwd(), filePath);
      
      // Try to get git commit date
      const gitCommand = `git log -1 --format=%cd --date=iso-strict -- "${absolutePath}"`;
      const gitDate = execSync(gitCommand, { 
        encoding: 'utf8', 
        maxBuffer: 1024 * 1024,
        timeout: 5000  // 5 second timeout per file
      }).trim();
      
      if (gitDate && gitDate.length > 0) {
        // Normalize path to use forward slashes for consistency
        filePath = filePath.replace(/\\/g, "/");
        lastUpdated[filePath] = gitDate;
        console.log(`  ✅ ${filePath}: ${gitDate}`);
      } else {
        // Fallback to file modification time
        const stats = statSync(absolutePath);
        const mtime = stats.mtime.toISOString();
        lastUpdated[filePath] = mtime;
        console.log(`  ⚠️  ${filePath}: ${mtime} (filesystem fallback)`);
      }
    } catch (error) {
      // Fallback to file modification time
      try {
        const absolutePath = resolve(process.cwd(), filePath);
        if (existsSync(absolutePath)) {
          const stats = statSync(absolutePath);
          const mtime = stats.mtime.toISOString();
          lastUpdated[filePath] = mtime;
          console.log(`  ⚠️  ${filePath}: ${mtime} (filesystem fallback)`);
        }
      } catch (fsError) {
        console.error(`  ❌ ${filePath}: Failed to get last modified date`);
      }
    }
  }
  
  // Write to public directory
  const outputPath = resolve(process.cwd(), 'public/last-updated.json');
  writeFileSync(outputPath, JSON.stringify(lastUpdated, null, 2));
  
  console.log(`\n✅ Successfully generated last-updated dates`);
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📊 Total files processed: ${files.length}`);
}

main().catch((error) => {
  console.error('❌ Failed to generate last-updated dates:', error);
  process.exit(1);
});
