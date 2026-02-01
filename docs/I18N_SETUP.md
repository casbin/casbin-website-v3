# i18n Implementation for Casbin Website v3

This document describes the internationalization (i18n) setup for the Casbin fumadocs v3 website.

## Overview

The website now supports 17 locales using next-intl:
- English (en) - default
- Chinese (zh), Japanese (ja), Korean (ko)
- French (fr), German (de), Spanish (es), Russian (ru)
- Arabic (ar), Portuguese (pt), Italian (it), Turkish (tr)
- Indonesian (id), Thai (th), Malay (ms), Ukrainian (uk), Vietnamese (vi)

## Structure

### Content Organization

Content is organized by locale:

```
content/
├── docs/
│   ├── en/           # English documentation
│   │   ├── basics/, model/, api/, etc.
│   ├── zh/           # Chinese documentation (to be added)
│   └── ...          # Other locales (to be added)
└── blog/
    ├── en/           # English blog posts
    └── ...
```

### Routing

URLs now include the locale segment:
- `/en/docs/get-started` - English documentation
- `/zh/docs/get-started` - Chinese documentation

### Configuration Files

1. **src/i18n/routing.ts** - Defines supported locales
2. **i18n.ts** - Root-level next-intl configuration  
3. **src/middleware.ts** - Locale detection middleware
4. **messages/*.json** - Translation files for UI strings

## Adding a New Locale

1. Add locale to `src/i18n/routing.ts`
2. Create `messages/{locale}.json`
3. Create `content/docs/{locale}/` and `content/blog/{locale}/`
4. Copy and translate content from English

## Crowdin Integration

- Project URL: https://crowdin.com/project/casbin
- Source: `content/docs/en/`
- Translations: `content/docs/{locale}/`

## Technical Details

- Uses Next.js App Router with `[locale]` segment
- Fumadocs content filtered by locale
- Custom slug function maintains flat URLs

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000/en or /zh

## Status

✅ Infrastructure complete
✅ English content migrated
⏳ Translations pending (can use existing Crowdin project)
