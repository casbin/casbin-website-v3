// Migration script to convert v2 plugin data to new TypeScript format
const fs = require('fs');
const path = require('path');

// Map of v2 data file paths
const dataFiles = {
  Adapter: [
    'AdapterGoData.js',
    'AdapterNodejsData.js',
    'AdapterPythonData.js',
    'AdapterJavaData.js',
    'AdapterPhpData.js',
    'AdapterDotNETData.js',
    'AdapterRustData.js',
    'AdapterRubyData.js',
    'AdapterSwiftData.js',
    'AdapterLuaData.js',
  ],
  Middleware: [
    'MiddlewareGoData.js',
    'MiddlewareNodejsData.js',
    'MiddlewarePythonData.js',
    'MiddlewareJavaData.js',
    'MiddlewarePhpData.js',
    'MiddlewareDotNETData.js',
    'MiddlewareRustData.js',
    'MiddlewareSwiftData.js',
    'MiddlewareLuaData.js',
    'MiddlewareCppData.js',
  ],
  Watcher: [
    'WatcherGoData.js',
    'WatcherNodejsData.js',
    'WatcherPythonData.js',
    'WatcherJavaData.js',
    'WatcherPhpData.js',
    'WatcherDotNETData.js',
    'WatcherRustData.js',
    'WatcherRubyData.js',
  ],
  RoleManager: [
    'RoleManagerGoData.js',
    'RoleManagerNodejsData.js',
    'RoleManagerPythonData.js',
    'RoleManagerJavaData.js',
    'RoleManagerPhpData.js',
  ],
  Dispatcher: [
    'DispatcherGoData.js',
  ],
};

// Extract language from filename (e.g., 'AdapterGoData.js' => 'Go')
function extractLanguage(filename) {
  const match = filename.match(/(Go|Nodejs|Python|Java|Php|DotNET|Rust|Ruby|Swift|Lua|Cpp)/);
  if (!match) return null;
  
  const langMap = {
    'Nodejs': 'Node.js',
    'DotNET': '.NET',
    'Cpp': 'C++',
  };
  
  return langMap[match[1]] || match[1];
}

async function migrateData() {
  const allPlugins = [];
  let totalCount = 0;

  for (const [category, files] of Object.entries(dataFiles)) {
    const dataFolder = category + 'Data';
    
    for (const file of files) {
      const filePath = path.join(__dirname, '../v2/src/tableData', dataFolder, file);
      
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File not found: ${filePath}`);
        continue;
      }

      try {
        // Read and parse the JavaScript file
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract the variable name and data
        const varMatch = content.match(/export\s+const\s+(\w+)\s*=/);
        if (!varMatch) {
          console.warn(`⚠️ Could not find export in: ${file}`);
          continue;
        }
        
        const varName = varMatch[1];
        
        // Use require to load the module
        delete require.cache[require.resolve(filePath)];
        const module = require(filePath);
        const data = module[varName];
        
        if (!Array.isArray(data)) {
          console.warn(`⚠️ Data is not an array in: ${file}`);
          continue;
        }
        
        const language = extractLanguage(file);
        
        // Transform each plugin
        const transformedPlugins = data.map(plugin => {
          const tags = [language, category].filter(Boolean);
          
          // Convert image path
          let image = plugin.image;
          if (image) {
            // Handle both /img/ecosystem/ and img/ecosystem/ formats
            if (image.startsWith('/img/ecosystem/')) {
              image = image.replace('/img/ecosystem/', '/images/ecosystem/');
            } else if (image.startsWith('img/ecosystem/')) {
              image = image.replace('img/ecosystem/', '/images/ecosystem/');
            }
          }
          
          return {
            title: plugin.title,
            description: plugin.description,
            ...(image ? { image } : {}),
            tags,
            ...(plugin.type ? { type: plugin.type } : {}),
            ...(plugin.autoSave ? { autoSave: plugin.autoSave } : {}),
            ...(plugin.author ? { author: plugin.author } : {}),
          };
        });
        
        allPlugins.push(...transformedPlugins);
        totalCount += transformedPlugins.length;
        console.log(`✅ Migrated ${transformedPlugins.length} plugins from ${file}`);
        
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
  }

  // Write the combined data to a new TypeScript file
  const outputPath = path.join(__dirname, '../src/data/plugins/all-plugins.ts');
  
  const tsContent = `// Auto-generated file - do not edit manually
// Generated from v2 data on ${new Date().toISOString()}

export interface Plugin {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  type?: string;
  autoSave?: string;
  author?: string;
}

export const allPlugins: Plugin[] = ${JSON.stringify(allPlugins, null, 2)};

export default allPlugins;
`;

  fs.writeFileSync(outputPath, tsContent, 'utf8');
  
  console.log('\n========================================');
  console.log(`✅ Migration complete!`);
  console.log(`📊 Total plugins migrated: ${totalCount}`);
  console.log(`📄 Output file: ${outputPath}`);
  console.log('========================================\n');
}

migrateData().catch(console.error);
