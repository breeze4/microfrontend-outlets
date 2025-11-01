# MFE v1 - Configuration-Driven App Shell

A micro-frontend architecture implementation using a configuration-driven app shell model with three backend services.

## Architecture Overview

This project implements a micro-frontend architecture with three Node.js/Express servers:

1. **Config Server** (Port 3001) - Serves JSON configurations for different modes
2. **Static Asset Server** (Port 3002) - Hosts MFE bundle files
3. **Routing Gateway** (Port 3000) - Main entry point with URL rewriting and proxying

## Prerequisites

- **Node.js** (v16 or higher)
- **pnpm** (install with `npm install -g pnpm` or `curl -fsSL https://get.pnpm.io/install.sh | sh -`)

## Quick Start

### Install Dependencies

Run the setup script to install dependencies for all servers:

```bash
./setup.sh
```

Or manually:

```bash
pnpm install
```

### Run the Servers

**Option 1: Run all servers with one command (recommended)**

```bash
pnpm start
```

This runs all three servers concurrently in a single terminal with color-coded output.

**Option 2: Run servers individually in separate terminals**

**Terminal 1 - Config Server:**
```bash
pnpm start:config
```

**Terminal 2 - Static Asset Server:**
```bash
pnpm start:assets
```

**Terminal 3 - Routing Gateway:**
```bash
pnpm start:gateway
```

### Access the Application

Open your browser to:
- **Dashboard Mode:** http://localhost:3000/dashboard
- **Hotlists Mode:** http://localhost:3000/hotlists

## Server Details

### Config Server (Port 3001)

Provides mode-specific configuration via JSON files.

**Endpoints:**
- `GET /api/config` - List all available modes
- `GET /api/config/:mode` - Get configuration for specific mode (dashboard, hotlists)
- `GET /health` - Health check

**Add New Mode:**
1. Create a new JSON file in `config-server/configs/yourmode.json`
2. Follow the schema used in `dashboard.json` or `hotlists.json`

### Static Asset Server (Port 3002)

Serves MFE bundle files following the `/mode/domain/container/app/resource` URL pattern.

**Example Assets:**
- http://localhost:3002/common/root/header/main.js
- http://localhost:3002/dashboard/navigation/sidebar/main.js
- http://localhost:3002/hotlists/navigation/sidebar/main.js

**Add New MFE:**
1. Create directory structure under `static-asset-server/mfes/` following the path pattern
2. Add your `main.js` file with mount/unmount methods
3. Reference it in the appropriate config JSON

### Routing Gateway (Port 3000)

Main entry point implementing three routing rules:

1. **API Routes** (`/api/*`) → Proxied to Config Server
2. **Asset Routes** (`*.js`, `*.css`, etc.) → Proxied to Static Asset Server
3. **SPA Fallback** (all other routes) → Serves app shell `index.html`

The app shell (`routing-gateway/public/app-shell.js`) handles:
- Mode detection from URL
- Config fetching
- Dynamic MFE loading and mounting

## Development

### Using nodemon for auto-reload

**Option 1: Run all servers in dev mode (recommended)**

```bash
pnpm dev              # Run all servers with auto-reload
pnpm dev:dashboard    # Run all servers optimized for dashboard mode
pnpm dev:hotlists     # Run all servers optimized for hotlists mode
```

All three commands run all servers concurrently with auto-reload enabled.

**Option 2: Run servers individually**

**Terminal 1:**
```bash
pnpm dev:config
```

**Terminal 2:**
```bash
pnpm dev:assets
```

**Terminal 3:**
```bash
pnpm dev:gateway
```

### Project Structure

```
mfe-v1/
├── config-server/
│   ├── configs/
│   │   ├── dashboard.json
│   │   └── hotlists.json
│   ├── package.json
│   └── server.js
├── static-asset-server/
│   ├── mfes/
│   │   ├── common/root/header/main.js
│   │   ├── common/root/footer/main.js
│   │   ├── dashboard/navigation/sidebar/main.js
│   │   ├── hotlists/navigation/sidebar/main.js
│   │   └── pages/...
│   ├── package.json
│   └── server.js
├── routing-gateway/
│   ├── public/
│   │   ├── index.html
│   │   └── app-shell.js
│   ├── package.json
│   └── server.js
├── docs/
│   └── SPEC.md
├── pnpm-workspace.yaml
├── package.json
└── setup.sh
```

This is a pnpm workspace monorepo with three separate server packages.

## Configuration Schema

Each mode configuration JSON follows this structure:

```json
{
  "mode": "dashboard",
  "staticFragments": [
    {
      "outlet": "header-outlet",
      "path": "/common/root/header",
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

## MFE Interface Contract

Each MFE must expose a global object with `mount` and `unmount` methods:

```javascript
window.YourMFE = {
  mount: function(elementId) {
    const element = document.getElementById(elementId);
    // Render your component
  },

  unmount: function(elementId) {
    const element = document.getElementById(elementId);
    // Clean up
  }
};
```

## Troubleshooting

**CORS Errors:**
- Ensure all three servers are running
- Check that ports 3000, 3001, 3002 are available

**Assets Not Loading:**
- Verify the path structure matches config JSON
- Check Static Asset Server logs for 404s
- Ensure file paths are correct in `mfes/` directory

**Configuration Not Found:**
- Check that JSON file exists in `config-server/configs/`
- Verify mode name in URL matches filename (without .json)
