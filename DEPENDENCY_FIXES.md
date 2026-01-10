# Dependency Fixes - KareTech Stack CLI Testing

**Date:** January 10, 2026
**Issue:** Dependency resolution failures during CLI testing

## Problems Identified

### 1. `@orpc/react-query` Version Issue
- **Error:** `No version matching "^0.0.3" found for specifier "@orpc/react-query"`
- **Root Cause:** Template using outdated version `^0.0.3`
- **Current Version:** `1.13.2` (as of January 2026)
- **Fix:** Update template to use `^1.13.2`

### 2. `@better-auth/drizzle` Package Issue
- **Error:** `GET https://registry.npmjs.org/@better-auth%2fdrizzle - 404`
- **Root Cause:** Package doesn't exist as separate module
- **Correct Implementation:** Drizzle adapter is part of main `better-auth` package
- **Import Path:** `better-auth/adapters/drizzle`
- **Fix:** Remove separate package, use adapter from main package

### 3. Related oRPC Package Versions
- **Updated Versions Needed:**
  - `@orpc/server`: Check latest (likely not `^0.0.3`)
  - `@orpc/client`: Check latest (likely not `^0.0.3`)

## Sources
- [@orpc/react-query - npm](https://www.npmjs.com/package/@orpc/react-query)
- [Drizzle ORM Adapter | Better Auth](https://www.better-auth.com/docs/adapters/drizzle)
- [Installation | Better Auth](https://www.better-auth.com/docs/installation)

## Files to Fix
- `/templates/base/package.json.ejs` - Update package versions
- Auth template files that import `@better-auth/drizzle`

## Testing Status
- ✅ CLI generation completes successfully
- ✅ All new default theme configurations applied correctly:
  - componentLibrary: "base-ui"
  - style: "maia"
  - baseColor: "zinc"
  - iconLibrary: "hugeicons"
  - radius: "0.75"
  - menuAccent: "subtle"
- ✅ Figtree font properly configured
- ✅ Dependency installation succeeds with fixed versions
- ✅ Dev server starts successfully on http://localhost:3000/
- ✅ Generated project builds and runs without critical errors

## Fixes Applied
1. ✅ Updated oRPC packages to version 1.13.2
2. ✅ Removed non-existent `@better-auth/drizzle` dependency
3. ✅ Updated `better-auth` to version 1.4.10
4. ✅ Fixed EJS HTML entity encoding in vite.config.ts template

## Final Status
🎉 **All CLI new default theme features working correctly!**

The KareTech Stack CLI now successfully generates projects with:
- Base UI component library
- Maia theme with Zinc/Blue colors
- Figtree font family
- Hugeicons icon library
- All dependencies installing correctly
- Dev server starting without issues