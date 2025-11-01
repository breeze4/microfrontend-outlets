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

- `docs/SPEC.md`: Full architectural specification with detailed design

## Development Notes

- This project is in early stages - implementation has not yet begun
- The architecture supports Module Federation for dynamic MFE loading
- Landing page MFEs can use any framework (React, Vue, etc.) with their own internal routers
- The app shell needs mode detection logic and a Composition Service component
