This architecture is a **configuration-driven app shell** model. The JSON you provided is the configuration that tells a central "shell" application how to compose the page from different micro-frontend (MFE) "fragments."

[cite\_start]This model strongly aligns with the "Micro Frontends" Option 2 described in your document, specifically the code example showing how `staticFragments` are mapped to "outlets" (or `<div>` tags) using a JSON config[cite: 66, 67, 68, 69, 70].

Here is a design for the app shell component logic and the server requirements needed to handle this.

### 1\. App Shell Component (Client-Side)

Your "component config" is not a single component but rather the core logic of your main "app shell" (the Angular app from our previous discussion). This shell is responsible for fetching and interpreting the JSON to build the page.

Here’s the step-by-step logic this shell would follow:

1.  **Bootstrap:** The user navigates to `https://example.com/dashboard/some/page`.

      * The server returns the main `index.html` of the app shell.
      * [cite\_start]This `index.html` is minimal, containing the "outlets" as `div`s[cite: 68]:
        ```html
        <body>
          <div id="header-outlet"></div>
          <div id="sidebar-outlet"></div>
          <div id="landing-page-outlet"></div>
          <div id="footer-outlet"></div>
        </body>
        ```

2.  **Mode Detection:** The shell's main JavaScript (e.g., `app.component.ts`) runs. It parses `window.location.pathname` to find the first segment (`/dashboard/`). This identifies the **`mode`** as "dashboard".

3.  **Config Fetching:** The shell makes an API call to a server endpoint to get the configuration for that mode (e.g., `GET /api/config/dashboard`).

4.  **Fragment Composition:** The shell receives the `dashboard` JSON. It must have a "Composition Service" that does the following:

      * [cite\_start]It parses the `staticFragments` array[cite: 67].
      * For each fragment (e.g., `header-outlet`):
          * **Build URL:** It combines the `mode` from the URL with the `path` from the config.
          * **`mode`:** `dashboard`
          * **`path`:** `/common/root/header`
          * **`resource`:** `main.js` (assuming a standard bundle name)
          * **Final Asset URL:** `/dashboard/common/root/header/main.js`. This perfectly matches your `/mode/domain/container/app/resource` structure.
          * **Load MFE:** It dynamically loads this script (e.g., using Module Federation's `loadRemoteModule` or by dynamically creating a `<script>` tag).
          * **Mount:** Once loaded, it mounts the MFE into the corresponding `div` (e.g., mount the `Header` component into `<div id="header-outlet"></div>`).
      * It repeats this for `sidebar-outlet` and `footer-outlet`.

5.  **Landing Page Handling:**

      * The shell's main router sees the user is at `/dashboard/some/page`.
      * It loads the MFE defined in `landingPage.resourcePath` (e.g., `/pages/dashboard/common/root/dashboard-landing`).
      * It mounts this "main" SPA into the `<div id="landing-page-outlet"></div>`.
      * Once mounted, the **MFE's internal router** (Angular or React) takes over to handle the `/some/page` part of the URL.

-----

### 2\. Server-Side Requirements

To make this client-side logic work, your server environment (e.g., Nginx, or a Node.js gateway) has three distinct responsibilities:

1.  **Config Server (API):**

      * Must provide an endpoint to serve the JSON configurations.
      * **Example:** A request to `GET /api/config/dashboard` returns the "dashboard" JSON object. A request to `GET /api/config/hotlists` returns the "hotlists" JSON.

2.  **Static Asset Server (File Hosting):**

      * Must host all the built MFE bundles (JS, CSS, images).
      * The server's file structure must be resolvable from your URL pattern. For example, a request for `/dashboard/common/root/header/main.js` might be mapped by the server to a physical path like `/var/www/mfes/common-root-header/1.2.0/main.js`.

3.  **Routing Gateway (URL Rewriting):**
    This is the most critical server-side piece. It must enforce rules on all incoming requests.

    **Implementation:** nginx running in Docker (see `routing-gateway/nginx.conf` and `docker-compose.yml`)

      * **Rule 1 (API Routes):** Any request starting with `/api/` (like `/api/config/...`) must be proxied to your **Config Server**.
      * **Rule 2 (Asset Routes):** Any request that looks like an asset (e.g., ends in `.js`, `.css`, `.ico`, `.png`) must be routed to your **Static Asset Server**. This includes all your MFE bundles.
      * **Rule 3 (SPA Fallback):** **All other requests** (e.g., `/dashboard/`, `/dashboard/some/page`, `/hotlists/foo/bar`) must *not* 404. They must all be served the exact same file: the main `index.html` of your app shell. This allows the client-side app shell to load, parse the URL, and take over the routing.

-----

### 3\. MFE Implementation Strategy

Each MFE is built as a standalone application using modern frameworks, then bundled to expose a global mount/unmount interface.

#### Framework Choices

*   **Common fragments (header, footer):** React with Vite
*   **Hotlists mode (sidebar, landing page):** React with Vite
*   **Dashboard sidebar:** React with Vite
*   **Dashboard landing page:** Angular with custom webpack configuration

#### MFE Contract

Each MFE must expose a global object following this interface:

```javascript
window.YourMFE = {
  mount: function(elementId) {
    // Render the framework component into DOM element
    const element = document.getElementById(elementId);
    // Framework-specific mounting logic
  },

  unmount: function(elementId) {
    // Clean up and unmount the framework component
    // Framework-specific cleanup logic
  }
};
```

#### Build Configuration

*   Each MFE is a separate project with its own `package.json` and build config
*   Vite-based MFEs use library mode to output single-file bundles
*   Angular MFE uses custom webpack config to output single-file bundle
*   All builds output to `static-asset-server/mfes/` following the path structure
*   No shared dependencies initially - each bundle is standalone

#### Source Directory Structure

MFE source code lives in `mfe-sources/` directory:

```
mfe-sources/
├── common-header/          # React + Vite
├── common-footer/          # React + Vite
├── dashboard-sidebar/      # React + Vite
├── dashboard-landing/      # Angular + Webpack
├── hotlists-sidebar/        # React + Vite
└── hotlists-dashboard/      # React + Vite
```

Each MFE project builds to its corresponding path in `static-asset-server/mfes/`.