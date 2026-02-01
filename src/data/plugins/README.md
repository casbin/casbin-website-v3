# Casbin Ecosystem - Plugin Data

This directory contains all the plugin data for the Casbin ecosystem page.

## Structure

- `tags.ts` - Defines all available tags (languages, plugin types)
- `middleware-go.ts` - Example: Go middleware plugins
- `index.ts` - Combines all plugin data and provides sorting functions

## How to Add More Plugins

### 1. Create a new data file

Create a file for each category, for example:

- `adapter-*.ts` for adapters
- `middleware-*.ts` for middlewares
- `watcher-*.ts` for watchers
- etc.

Example `adapter-go.ts`:

```typescript
import type { TagType } from './tags';

export interface Plugin {
  title: string;
  description: string;
  image?: string;
  tags: TagType[];
}

export const AdapterGoData: Plugin[] = [
  {
    title: '[MySQL](https://github.com/casbin/mysql-adapter)',
    description: 'MySQL adapter for Casbin',
    tags: ['Go', 'Adapter', 'favorite'],
  },
  // ... more plugins
];
```

### 2. Import in index.ts

Add your new data to the `allPlugins` array in `index.ts`:

```typescript
import { AdapterGoData } from './adapter-go';

export const allPlugins: Plugin[] = [
  ...MiddlewareGoData,
  ...AdapterGoData, // Add here
  // Add more...
];
```

### 3. Data Format

Each plugin object should have:

- **title**: Plugin name, preferably as markdown link: `[Name](url)`
- **description**: Description, can include markdown links
- **image**: (optional) Path to plugin logo image in `/public/images/ecosystem/`
- **tags**: Array of tag identifiers from `tags.ts`

### 4. Available Tags

#### Languages

- `Go`, `Java`, `NodeJS`, `PHP`, `Python`, `dotNET`, `Rust`, `Lua`, `Swift`, `Ruby`, `Cpp`

#### Plugin Types

- `Adapter` - Policy storage adapters
- `Dispatcher` - Distributed enforcement
- `Middleware` - Web framework integration
- `RoleManager` - Role hierarchy management
- `Watcher` - Policy change notifications
- `favorite` - Featured plugins

### 5. Images

Place plugin logos in `/public/images/ecosystem/` and reference them as:

```typescript
image: '/images/ecosystem/gin.jpeg';
```

## Tips

1. **Favorites**: Add the `'favorite'` tag to feature important plugins
2. **Links**: Use markdown format in title/description for automatic linking
3. **Consistency**: Follow the same pattern for all plugins
4. **Sorting**: Plugins are automatically sorted by favorites first, then alphabetically

## Migrating from v2

The old v2 data is in `/v2/src/tableData/`. To migrate:

1. Copy data from old files like `MiddlewareGoData.js`
2. Convert to TypeScript format with proper types
3. Update image paths from `/img/ecosystem/` to `/images/ecosystem/`
4. Ensure tags match the new tag system
5. Add to `index.ts`
