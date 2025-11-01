# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a micro-frontend (MFE) architecture project implementing a **configuration-driven app shell** model. The system uses JSON configuration to compose pages from different micro-frontend fragments dynamically.

## Architecture

### Core Concepts

The architecture follows a three-layer model:

1. **App Shell (Client-Side)**: A central shell application that:
   - Detects the mode from URL path (first segment, e.g., `/dashboard/`)
   - Fetches configuration JSON from `/api/config/{mode}`
   - Dynamically loads and mounts MFE fragments into predefined outlets
   - Handles routing and composition of static fragments and landing pages

2. **Configuration Schema**: JSON files define how to compose each mode:
   - `staticFragments`: Array of fragments (header, sidebar, footer) with outlet mappings
   - `landingPage`: Main SPA resource path for the mode
   - Fragments map to `/mode/domain/container/app/resource` URL pattern

3. **Server Requirements**:
   - **Config Server**: API endpoint serving JSON configurations (`/api/config/{mode}`)
   - **Static Asset Server**: Hosts built MFE bundles (JS, CSS, images)
   - **Routing Gateway**: URL rewriting with rules:
     - `/api/*` → proxied to Config Server
     - `*.js`, `*.css`, `*.ico`, `*.png` → routed to Static Asset Server
     - All other requests → serve app shell `index.html` (SPA fallback)

### URL Structure

MFE assets follow the pattern: `/mode/domain/container/app/resource`

Example: `/dashboard/common/root/header/main.js`

- `mode`: First URL segment (dashboard, hotlists, etc.)
- `domain/container/app`: Fragment path from config
- `resource`: Bundle file (main.js, styles.css, etc.)

### Fragment Loading Flow

1. User navigates to `https://example.com/dashboard/some/page`
2. Server returns app shell `index.html` with outlet divs
3. Shell detects mode ("dashboard") from URL
4. Shell fetches `/api/config/dashboard`
5. Composition Service parses `staticFragments` array
6. For each fragment, shell builds asset URL and dynamically loads/mounts MFE
7. Landing page MFE is mounted, its internal router handles remaining path

### Outlets

The app shell `index.html` contains predefined outlets as divs:
- `header-outlet`
- `sidebar-outlet`
- `landing-page-outlet`
- `footer-outlet`

MFEs are dynamically mounted into these outlets based on configuration.

## Project Structure

```
mfe-v1/
├── config-server/                 # Config Server (port 3001)
│   ├── configs/
│   │   ├── dashboard.json        # Dashboard mode configuration
│   │   └── hotlists.json         # Hotlists mode configuration
│   ├── package.json
│   └── server.js
│
├── static-asset-server/          # Static Asset Server (port 3002)
│   ├── mfes/                     # Built MFE bundles (git-ignored)
│   │   ├── shell/
│   │   │   ├── index.html        # App shell HTML
│   │   │   └── app-shell.js      # App shell orchestration logic
│   │   ├── common/root/header/
│   │   ├── common/root/footer/
│   │   ├── dashboard/navigation/sidebar/
│   │   ├── hotlists/navigation/sidebar/
│   │   └── pages/...
│   ├── package.json
│   └── server.js
│
├── routing-gateway/              # Routing Gateway (port 3000, main entry)
│   ├── package.json
│   └── server.js
│
├── mfe-sources/                  # Source code for all MFEs
│   ├── mfe-shell/               # App shell source
│   ├── common-header/           # React + Vite
│   ├── common-footer/           # React + Vite
│   ├── dashboard-sidebar/       # React + Vite
│   ├── dashboard-landing/       # Angular + Webpack
│   ├── hotlists-sidebar/        # React + Vite
│   └── hotlists-dashboard/      # React + Vite
│
├── docs/
│   └── SPEC.md                  # Full architectural specification
│
├── pnpm-workspace.yaml          # pnpm workspace configuration
├── package.json                 # Root package with all scripts
├── README.md                    # User-facing documentation
└── CLAUDE.md                    # This file
```

Key files:
- `docs/SPEC.md`: Full architectural specification with detailed design
- `mfe-sources/mfe-shell/src/app-shell.js`: Core orchestration logic
- `static-asset-server/mfes/shell/index.html`: HTML with outlet divs

## Current Implementation Status

**WORKING**: This is a fully functional micro-frontend architecture implementation.

### What's Implemented

All core components are built and operational:

1. **Backend Servers** (all Node.js/Express):
   - **Config Server** (`config-server/`, port 3001) - serves mode configurations via `/api/config/:mode`
   - **Static Asset Server** (`static-asset-server/`, port 3002) - hosts built MFE bundles
   - **Routing Gateway** (`routing-gateway/`, port 3000) - main entry point with URL rewriting rules

2. **App Shell** (`mfe-sources/mfe-shell/`):
   - JavaScript-based shell (`app-shell.js`) that detects mode, fetches config, loads MFEs
   - HTML with outlet divs (`index.html`) deployed to `static-asset-server/mfes/shell/`

3. **MFE Fragments** (all in `mfe-sources/`):
   - `common-header/` - React + Vite, shared header
   - `common-footer/` - React + Vite, shared footer
   - `dashboard-sidebar/` - React + Vite, dashboard navigation
   - `dashboard-landing/` - Angular + Webpack, main dashboard page
   - `hotlists-sidebar/` - React + Vite, hotlists navigation
   - `hotlists-dashboard/` - React + Vite, main hotlists page

4. **Configuration Files** (`config-server/configs/`):
   - `dashboard.json` - defines dashboard mode composition
   - `hotlists.json` - defines hotlists mode composition

### How It Works

1. User navigates to `http://localhost:3000/dashboard` (routing gateway)
2. Gateway serves app shell `index.html` (SPA fallback rule)
3. Shell JavaScript detects mode ("dashboard") from URL
4. Shell fetches `/api/config/dashboard` from config server
5. Shell dynamically loads each MFE bundle from static asset server
6. Each MFE mounts itself into its designated outlet div

### MFE Contract

Each MFE exposes a global object with this interface:

```javascript
window.YourMFE = {
  mount: function(elementId) {
    // Mount framework component into DOM element
  },
  unmount: function(elementId) {
    // Cleanup and unmount
  }
};
```

### Build & Deploy

- **Source**: All MFE source code is in `mfe-sources/` directory
- **Build**: Each MFE has its own build configuration (Vite or Webpack)
- **Output**: Built bundles are deployed to `static-asset-server/mfes/` (git-ignored)
- **Paths**: Follow pattern `/mode/domain/container/app/resource` (e.g., `/dashboard/navigation/sidebar/main.js`)

Build all MFEs from project root:

```bash
pnpm build:mfes                  # Build all MFEs (shell + all fragments)
pnpm build:header                # Build just common-header
pnpm build:footer                # Build just common-footer
pnpm build:dashboard-sidebar     # Build just dashboard-sidebar
pnpm build:dashboard-landing     # Build just dashboard-landing
pnpm build:hotlists-sidebar      # Build just hotlists-sidebar
pnpm build:hotlists-dashboard    # Build just hotlists-dashboard
pnpm build:shell                 # Build just app-shell
```

Development mode with hot reload for MFEs:

```bash
pnpm dev:mfes                    # Run all MFE builds in watch mode
```

### Running the App

From project root:

```bash
pnpm install    # Install all dependencies (monorepo)
pnpm start      # Run all three servers concurrently
```

Access at:
- Dashboard: `http://localhost:3000/dashboard`
- Hotlists: `http://localhost:3000/hotlists`

### Adding New MFEs

1. Create source in `mfe-sources/your-mfe/`
2. Configure build to output to `static-asset-server/mfes/your/path/`
3. Update relevant config JSON in `config-server/configs/`
4. Add global name mapping in `app-shell.js` `mfeMap` object

### Key Implementation Details

- **No Module Federation**: Uses simple script loading with global objects (simpler, easier to understand)
- **Standalone bundles**: Each MFE is self-contained with its own dependencies
- **Framework agnostic**: MFEs can use any framework as long as they follow the mount/unmount contract
- **pnpm workspace**: Monorepo structure with workspace for all servers and MFE sources
