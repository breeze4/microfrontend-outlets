// App Shell - Main orchestration logic with client-side routing

interface AppState {
  currentMode: string | null;
  mountedFragments: Record<string, { mfeName: string; path: string; assetUrl: string }>;
  loadedScripts: Set<string>;
  configs: Record<string, any>;
}

interface Fragment {
  outlet: string;
  path: string;
  resource: string;
}

(function() {
  console.log('App Shell initializing...');

  const CONFIG_SERVER_URL = 'http://localhost:3001';
  const ASSET_SERVER_URL = 'http://localhost:3002';

  // State tracking for mounted MFEs
  const appState: AppState = {
    currentMode: null,
    mountedFragments: {},
    loadedScripts: new Set(),
    configs: {}
  };

  // Extract mode from URL path (first segment)
  function detectMode(): string {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s);
    return segments[0] || 'dashboard'; // Default to dashboard
  }


  // Global navigation helper function
  window.navigateTo = function(path: string): void {
    console.log(`[Navigation] Navigating to: ${path}`);
    window.history.pushState({}, '', path);

    // Dispatch popstate event to notify routers (Angular & React)
    // This is needed because pushState doesn't trigger popstate automatically
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));

    // Note: We don't dispatch app-navigate here because popstate already triggers handleRouteChange
    // Dispatching both would cause handleRouteChange to run twice, causing race conditions
  };

  // Load a script dynamically
  function loadScript(url: string): Promise<string> {
    // Check if script already loaded
    if (appState.loadedScripts.has(url)) {
      console.log(`[Script] Already loaded: ${url}`);
      return Promise.resolve(url);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        appState.loadedScripts.add(url);
        resolve(url);
      };
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.body.appendChild(script);
    });
  }

  // Get MFE name for outlet and mode
  function getMfeName(outlet: string, mode: string): string | undefined {
    const mfeMap = {
      'header-outlet': 'HeaderMFE',
      'footer-outlet': 'FooterMFE',
      'sidebar-outlet': mode === 'dashboard' ? 'DashboardSidebarMFE' : 'HotlistsSidebarMFE',
      'landing-page-outlet': mode === 'dashboard' ? 'DashboardLandingPageMFE' : 'HotlistsDashboardMFE'
    };
    return mfeMap[outlet];
  }

  // Unmount a fragment from an outlet
  function unmountFragment(outlet: string): void {
    const fragmentInfo = appState.mountedFragments[outlet];
    if (!fragmentInfo) {
      console.log(`[Unmount] No fragment mounted in ${outlet}`);
      return;
    }

    const { mfeName } = fragmentInfo;
    console.log(`[Unmount] Unmounting ${mfeName} from ${outlet}`);

    if (window[mfeName] && typeof window[mfeName].unmount === 'function') {
      window[mfeName].unmount(outlet);
    }

    delete appState.mountedFragments[outlet];
  }

  // Mount a fragment into an outlet
  async function mountFragment(fragment: Fragment, mode: string): Promise<void> {
    const { outlet, path, resource } = fragment;

    // Check if already mounted
    const fragmentInfo = appState.mountedFragments[outlet];
    const mfeName = getMfeName(outlet, mode);

    if (fragmentInfo && fragmentInfo.mfeName === mfeName) {
      console.log(`[Mount] ${mfeName} already mounted in ${outlet}`);
      return;
    }

    // Build the asset URL: /mode/path/resource
    const assetUrl = `${ASSET_SERVER_URL}${path}/${resource}`;

    console.log(`[Mount] Loading fragment for ${outlet}: ${assetUrl}`);

    try {
      await loadScript(assetUrl);

      if (window[mfeName] && typeof window[mfeName].mount === 'function') {
        window[mfeName].mount(outlet);

        // Track mounted fragment
        appState.mountedFragments[outlet] = {
          mfeName,
          path,
          assetUrl
        };
      } else {
        console.error(`[Mount] MFE ${mfeName} not found or doesn't have mount method`);
      }
    } catch (error) {
      console.error(`[Mount] Failed to load fragment for ${outlet}:`, error);
      document.getElementById(outlet).innerHTML = `
        <div style="padding: 1rem; background: #fee; color: #c00;">
          Error loading ${outlet}: ${error.message}
        </div>
      `;
    }
  }

  // Fetch configuration for a mode
  async function fetchConfig(mode: string): Promise<any> {
    // Return cached config if available
    if (appState.configs[mode]) {
      console.log(`[Config] Using cached config for mode: ${mode}`);
      return appState.configs[mode];
    }

    const configUrl = `${CONFIG_SERVER_URL}/api/config/${mode}`;
    console.log(`[Config] Fetching from: ${configUrl}`);

    const response = await fetch(configUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status}`);
    }

    const config = await response.json();
    appState.configs[mode] = config;
    console.log('[Config] Configuration loaded:', config);

    return config;
  }

  // Handle route changes
  async function handleRouteChange(): Promise<void> {
    try {
      const newMode = detectMode();
      console.log(`[Route Change] Current mode: ${appState.currentMode}, New mode: ${newMode}`);

      // If mode hasn't changed, let the landing page router handle it
      if (appState.currentMode === newMode) {
        console.log('[Route Change] Same mode, landing page will handle route');
        return;
      }

      // Mode has changed - need to swap fragments
      console.log(`[Route Change] Mode changed from ${appState.currentMode} to ${newMode}`);

      // Unmount mode-specific fragments (sidebar and landing page)
      unmountFragment('sidebar-outlet');
      unmountFragment('landing-page-outlet');

      // Fetch config for new mode
      const config = await fetchConfig(newMode);

      // Mount new sidebar
      const sidebarFragment = config.staticFragments.find(f => f.outlet === 'sidebar-outlet');
      if (sidebarFragment) {
        await mountFragment(sidebarFragment, newMode);
      }

      // Mount new landing page
      if (config.landingPage) {
        const landingPageFragment = {
          outlet: config.landingPage.outlet,
          path: config.landingPage.resourcePath,
          resource: config.landingPage.resource
        };
        await mountFragment(landingPageFragment, newMode);
      }

      // Update current mode
      appState.currentMode = newMode;
      console.log(`[Route Change] Successfully switched to mode: ${newMode}`);

    } catch (error) {
      console.error('[Route Change] Failed to handle route change:', error);
    }
  }

  // Main composition function (initial load)
  async function composeApplication(): Promise<void> {
    try {
      const mode = detectMode();
      console.log(`[Init] Detected mode: ${mode}`);

      // Fetch configuration for this mode
      const config = await fetchConfig(mode);

      // Load all static fragments
      const fragmentPromises = config.staticFragments.map(fragment =>
        mountFragment(fragment, mode)
      );

      // Load landing page
      if (config.landingPage) {
        const landingPageFragment = {
          outlet: config.landingPage.outlet,
          path: config.landingPage.resourcePath,
          resource: config.landingPage.resource
        };
        fragmentPromises.push(mountFragment(landingPageFragment, mode));
      }

      await Promise.all(fragmentPromises);

      // Set current mode
      appState.currentMode = mode;
      console.log('[Init] All fragments loaded successfully');

    } catch (error) {
      console.error('[Init] Failed to compose application:', error);
      document.getElementById('app-container').innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1 style="color: #c00;">Application Failed to Load</h1>
          <p>${error.message}</p>
        </div>
      `;
    }
  }

  // Listen for browser back/forward navigation and programmatic navigation
  window.addEventListener('popstate', () => {
    console.log('[Popstate] Browser navigation detected');
    handleRouteChange();
  });

  // Start the application
  composeApplication();
})();
