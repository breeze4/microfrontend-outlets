// App Shell - Main orchestration logic
(function() {
  console.log('App Shell initializing...');

  const CONFIG_SERVER_URL = 'http://localhost:3001';
  const ASSET_SERVER_URL = 'http://localhost:3002';

  // Extract mode from URL path (first segment)
  function detectMode() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s);
    return segments[0] || 'dashboard'; // Default to dashboard
  }

  // Load a script dynamically
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve(url);
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.body.appendChild(script);
    });
  }

  // Mount a fragment into an outlet
  function mountFragment(fragment, mode) {
    const { outlet, path, resource } = fragment;

    // Build the asset URL: /mode/path/resource
    const assetUrl = `${ASSET_SERVER_URL}${path}/${resource}`;

    console.log(`Loading fragment for ${outlet}: ${assetUrl}`);

    return loadScript(assetUrl)
      .then(() => {
        // Each MFE exposes a global object with mount/unmount methods
        // Map outlet names to global objects (this is simplified - in production use a registry)
        const mfeMap = {
          'header-outlet': 'HeaderMFE',
          'footer-outlet': 'FooterMFE',
          'sidebar-outlet': mode === 'dashboard' ? 'DashboardSidebarMFE' : 'HotlistsSidebarMFE',
          'landing-page-outlet': mode === 'dashboard' ? 'DashboardLandingPageMFE' : 'HotlistsDashboardMFE'
        };

        const mfeName = mfeMap[outlet];
        if (window[mfeName] && typeof window[mfeName].mount === 'function') {
          window[mfeName].mount(outlet);
        } else {
          console.error(`MFE ${mfeName} not found or doesn't have mount method`);
        }
      })
      .catch(error => {
        console.error(`Failed to load fragment for ${outlet}:`, error);
        document.getElementById(outlet).innerHTML = `
          <div style="padding: 1rem; background: #fee; color: #c00;">
            Error loading ${outlet}: ${error.message}
          </div>
        `;
      });
  }

  // Main composition function
  async function composeApplication() {
    try {
      const mode = detectMode();
      console.log(`Detected mode: ${mode}`);

      // Fetch configuration for this mode
      const configUrl = `${CONFIG_SERVER_URL}/api/config/${mode}`;
      console.log(`Fetching config from: ${configUrl}`);

      const response = await fetch(configUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.status}`);
      }

      const config = await response.json();
      console.log('Configuration loaded:', config);

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
      console.log('All fragments loaded successfully');

    } catch (error) {
      console.error('Failed to compose application:', error);
      document.getElementById('app-container').innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1 style="color: #c00;">Application Failed to Load</h1>
          <p>${error.message}</p>
        </div>
      `;
    }
  }

  // Start the application
  composeApplication();
})();
