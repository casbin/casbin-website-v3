/**
 * Plugin Data Migration Helper
 * 
 * This script helps migrate plugin data from v2 to the new structure.
 * 
 * Usage:
 * 1. Run this script to see which files need to be migrated
 * 2. It will read data from v2 and convert to TypeScript format
 * 3. Output files will be created in src/data/plugins/
 * 
 * Note: This is a one-time migration script
 */

import * as fs from 'fs';
import * as path from 'path';

const V2_DATA_PATH = path.join(process.cwd(), 'v2', 'src', 'tableData');
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'plugins');

interface PluginData {
  title: string;
  author?: string;
  description: string;
  image?: string | null;
  type?: string;
  autoSave?: string;
}

// Read and convert a JS data file to TypeScript
function convertDataFile(category: string, language: string): string {
  const filePath = path.join(V2_DATA_PATH, `${category}Data`, `${category}${language}Data.js`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract the array content using regex
    const arrayMatch = content.match(/export const \w+Data = \[([\s\S]*?)\];/);
    if (!arrayMatch) {
      console.log(`Could not parse ${filePath}`);
      return '';
    }

    const dataStr = arrayMatch[1];
    // Convert to proper JSON-like format
    const plugins: PluginData[] = eval(`[${dataStr}]`);
    
    // Convert to TypeScript
    const tsContent = `import type { TagType } from './tags';

export interface Plugin {
  title: string;
  author?: string;
  description: string;
  image?: string;
  type?: string;
  autoSave?: '✅' | '❌';
  tags: TagType[];
}

export const ${category}${language}Data: Plugin[] = ${JSON.stringify(plugins, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
    
    return tsContent;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return '';
  }
}

// Main migration function
async function migrate() {
  const categories = ['Adapter', 'Middleware', 'Watcher', 'RoleManager', 'Dispatcher'];
  const languages = ['Go', 'Java', 'Nodejs', 'Php', 'Python', 'DotNET', 'Rust', 'Ruby', 'Swift', 'Lua', 'Cpp'];
  
  console.log('Starting migration...\n');
  
  let totalCount = 0;
  
  for (const category of categories) {
    console.log(`\nMigrating ${category}...`);
    let categoryCount = 0;
    
    for (const lang of languages) {
      const content = convertDataFile(category, lang);
      if (content) {
        const outputFile = path.join(OUTPUT_PATH, `${category.toLowerCase()}-${lang.toLowerCase()}.ts`);
        fs.writeFileSync(outputFile, content);
        console.log(`  ✓ ${lang} (${content.match(/title:/g)?.length || 0} plugins)`);
        categoryCount += content.match(/title:/g)?.length || 0;
        totalCount += content.match(/title:/g)?.length || 0;
      }
    }
    
    console.log(`  Total ${category}: ${categoryCount} plugins`);
  }
  
  console.log(`\n✅ Migration complete! Total plugins: ${totalCount}`);
}

// Check if running in Node environment
if (typeof require !== 'undefined' && require.main === module) {
  migrate();
}

export { migrate };
