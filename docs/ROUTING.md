# Routing Architecture

## Current: Two-Tier Routing

**App Shell** handles mode-level routing:
- Detects mode from first URL segment (`/dashboard`, `/hotlists`)
- Mounts/unmounts mode-specific fragments when mode changes
- Ignores within-mode navigation

**Landing Page MFEs** handle sub-route routing:
- Each uses its own framework router (Angular Router, React Router)
- Each defines its own routes and components
- Handles all navigation within its mode

Example flow:
1. `/dashboard` → `/hotlists`: Shell unmounts dashboard fragments, mounts hotlists fragments
2. `/dashboard` → `/dashboard/claims`: Shell does nothing, Angular Router in dashboard-landing handles route

## Alternative: Centralized Shell Routing

Shell would handle ALL routing:
- Route definitions move to configuration JSONs
- Shell loads individual page MFEs based on route matches
- Each route becomes a separate MFE bundle
- Landing pages become simple page components (no internal routing)

## Key Differences

| Aspect | Two-Tier (Current) | Shell Routing |
|--------|-------------------|---------------|
| Route definitions | In MFE code | In config JSONs |
| Bundles per mode | 1 landing page SPA | 1 per route/page |
| Framework routing | Full Angular/React Router | None (shell handles) |
| Shell complexity | Simple (mode detection only) | Complex (route matching, transitions) |
| Initial load | Full landing page | Just needed page component |
| Team autonomy | High (each mode independent) | Low (centralized control) |

## Why Two-Tier?

1. **Cohesive domains**: Dashboard and Hotlists are distinct business areas that benefit from being self-contained SPAs
2. **Framework benefits**: Teams use full Angular/React Router features (guards, nested routes, data loaders)
3. **Simpler overall**: Shell stays simple, MFEs stay autonomous
4. **Reasonable bundle sizes**: Loading full dashboard SPA on mode entry is acceptable
5. **Team ownership**: Each landing page team controls their own routing

## When to Consider Shell Routing

- Dozens of routes per mode with critical initial load time
- Routes span multiple teams needing central governance
- Need to mix different frameworks within a single mode
- Require centralized auth/analytics on every route change

## Gotchas

### Trailing Slash Inconsistency Between Frameworks

**Issue**: Angular Router adds trailing slashes to root routes, React Router does not.

**Behavior**:
- Navigating to `/dashboard` → Angular normalizes to `/dashboard/`
- Navigating to `/hotlists` → React keeps as `/hotlists`

**Root Cause**:
- Angular Router with `APP_BASE_HREF='/dashboard'` treats the root path (`''`) as a "directory" and adds a trailing slash
- React Router with `basename="/hotlists"` does not normalize trailing slashes

**Solution**: Use trailing slashes consistently in all navigation links for both modes:
```jsx
// Header navigation
<a href="/dashboard/" onClick={(e) => handleNavClick(e, '/dashboard/')}>Dashboard</a>
<a href="/hotlists/" onClick={(e) => handleNavClick(e, '/hotlists/')}>Hotlists</a>

// Sidebar navigation
{ label: 'Dashboard', href: '/dashboard/' }
{ label: 'Hotlists', href: '/hotlists/' }
```

**Why This Works**: Both routers accept trailing slashes, so using them consistently avoids URL mismatches in browser history.
