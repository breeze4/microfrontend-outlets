# MFE v1 - Configuration-Driven App Shell

A micro-frontend architecture experiment that uses JSON configuration to dynamically compose pages from different micro-frontend fragments. Does not use Module Federation. There are full page loads between top level SPA routes.

Inspired by this blog post: https://www.capitalone.com/tech/software-engineering/loosely-coupled-micro-frontends-with-nodejs/

## Architecture Overview

This project uses three backend services:

1. **Routing Gateway** (Port 3000) - nginx (Docker) - Main entry point with URL rewriting and proxying
2. **Config Server** (Port 3001) - Node.js/Express - Serves JSON configurations for different modes
3. **Static Asset Server** (Port 3002) - nginx (Docker) - Hosts built MFE bundles. Dev mode outputs bundled files into the hosted assets directory.

### How It Works

1. User navigates to `http://localhost:3000/dashboard/some/page`
2. **Routing Gateway** serves the app shell `index.html` (SPA fallback)
3. **App Shell** JavaScript detects mode ("dashboard") from URL path
4. App shell fetches configuration from **Config Server** (`/api/config/dashboard`)
5. JSON config specifies which fragments to load and where to mount them
6. App shell dynamically loads each MFE bundle from **Static Asset Server**
7. Each MFE mounts itself into its designated outlet div (header, sidebar, footer, landing page)

### Core Components

#### Routing Gateway (port 3000)

nginx running in Docker implements three routing rules:

- **API Routes** (`/api/*`) → Proxied to Config Server (port 3001)
- **Asset Routes** (`*.js`, `*.css`, `*.ico`, `*.png`) → Proxied to Static Asset Server (port 3002)
- **SPA Fallback** (all other routes) → Serves app shell `index.html`

The SPA fallback enables client-side routing - all page requests return the same HTML, allowing the app shell to handle routing dynamically.

#### Config Server (port 3001)

Provides JSON configurations that define how each mode is composed.

**Key endpoints:**
- `GET /api/config/:mode` - Returns configuration for a specific mode (dashboard, hotlists, etc.)
- `GET /api/config` - Lists all available modes

Configurations are stored as JSON files in `config-server/configs/`.

#### Static Asset Server (port 3002)

Hosts all built MFE bundles following the URL pattern: `/mode/domain/container/app/resource`

**Example assets:**
- `/common/root/header/main.js` - Shared header fragment
- `/dashboard/navigation/sidebar/main.js` - Dashboard sidebar
- `/pages/dashboard/common/root/dashboard-landing/main.js` - Dashboard landing page

Built MFE bundles are stored in `static-asset-server/mfes/` following the path structure.

#### App Shell

The app shell is the orchestration layer (`static-asset-server/mfes/shell/index.html` and `app-shell.js`). It:

1. **Detects mode** from the first URL segment (e.g., `/dashboard/` → mode is "dashboard")
2. **Fetches configuration** from Config Server for that mode
3. **Dynamically loads MFE bundles** by constructing asset URLs from the config
4. **Mounts fragments** into outlet divs in the HTML

The shell `index.html` contains four outlet divs:
- `header-outlet`
- `sidebar-outlet`
- `landing-page-outlet`
- `footer-outlet`

#### MFE Sources

Source code for all micro-frontends lives in `mfe-sources/`:

- `mfe-shell/` - App shell source
- `common-header/` - React + Vite
- `common-footer/` - React + Vite
- `dashboard-sidebar/` - React + Vite
- `dashboard-landing/` - Angular + Webpack
- `hotlists-sidebar/` - React + Vite
- `hotlists-dashboard/` - React + Vite

Each MFE is built separately and outputs to `static-asset-server/mfes/` following the path structure.

## Installation & Running

```bash
# Install dependencies
pnpm install

# Build all MFE bundles
pnpm build:mfes

# Start all servers
pnpm start

# Dev mode
## terminal 1: launch docker compose and all backends
pnpm dev
## terminal 2: launch frontend builds
pnpm dev:mfes
```

### Access the Application

http://localhost:3000

## JSON Configuration

Each mode is defined by a JSON configuration file in `config-server/configs/`. Here's the complete `dashboard.json` example:

```json
{
  "mode": "dashboard",
  "staticFragments": [
    {
      "outlet": "header-outlet",
      "path": "/common/root/header",
      "resource": "main.js"
    },
    {
      "outlet": "sidebar-outlet",
      "path": "/dashboard/navigation/sidebar",
      "resource": "main.js"
    },
    {
      "outlet": "footer-outlet",
      "path": "/common/root/footer",
      "resource": "main.js"
    }
  ],
  "landingPage": {
    "outlet": "landing-page-outlet",
    "resourcePath": "/pages/dashboard/common/root/dashboard-landing",
    "resource": "main.js"
  }
}
```

### Configuration Fields

**`staticFragments`** - Array of fragments that remain mounted across page navigations within the mode (header, sidebar, footer)

Each fragment has:
- **`outlet`** - The ID of the HTML div where this fragment will be mounted (`header-outlet`, `sidebar-outlet`, `footer-outlet`)
- **`path`** - The URL path to the fragment's directory (follows `/domain/container/app` pattern)
- **`resource`** - The bundle filename (typically `main.js`)

**`landingPage`** - The main SPA for this mode, mounted in `landing-page-outlet`

- **`outlet`** - Always `landing-page-outlet`
- **`resourcePath`** - Full path to the landing page bundle
- **`resource`** - The bundle filename

The Static Asset Server maps these URLs to physical files in `static-asset-server/mfes/`.

### Adding a New Mode

1. Create `config-server/configs/yourmode.json` following the schema above
2. Build your MFE bundles to `static-asset-server/mfes/` following the path structure
3. Navigate to `http://localhost:3000/yourmode`

## MFE Interface Contract

Each MFE must expose a global object with `mount` and `unmount` methods:

```javascript
window.YourMFE = {
  mount: function(elementId) {
    const element = document.getElementById(elementId);
    // Render your component into the element
  },

  unmount: function(elementId) {
    const element = document.getElementById(elementId);
    // Clean up and unmount
  }
};
```

The app shell calls `mount(elementId)` to render the MFE and `unmount(elementId)` when switching modes or cleaning up.
