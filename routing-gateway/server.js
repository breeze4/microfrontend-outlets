const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const CONFIG_SERVER_URL = 'http://localhost:3001';
const ASSET_SERVER_URL = 'http://localhost:3002';

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rule 1: Proxy API requests to Config Server
app.use('/api', createProxyMiddleware({
  target: CONFIG_SERVER_URL,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[PROXY -> CONFIG] ${req.method} ${req.path} -> ${CONFIG_SERVER_URL}${req.path}`);
  }
}));

// Rule 2: Proxy asset requests to Static Asset Server
// Match requests ending in .js, .css, .ico, .png, .jpg, .svg, .woff, .woff2, etc.
const assetPattern = /\.(js|css|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i;

app.use((req, res, next) => {
  if (assetPattern.test(req.path)) {
    console.log(`[PROXY -> ASSETS] ${req.method} ${req.path} -> ${ASSET_SERVER_URL}${req.path}`);

    createProxyMiddleware({
      target: ASSET_SERVER_URL,
      changeOrigin: true,
      logLevel: 'debug'
    })(req, res, next);
  } else {
    next();
  }
});

// Rule 3: SPA Fallback - proxy index.html from Static Asset Server for all other routes
// This allows client-side routing to work
app.get('*', (req, res) => {
  console.log(`[SPA FALLBACK] Proxying index.html for ${req.path} -> ${ASSET_SERVER_URL}/shell/index.html`);

  createProxyMiddleware({
    target: ASSET_SERVER_URL,
    changeOrigin: true,
    pathRewrite: () => '/shell/index.html',
    logLevel: 'debug'
  })(req, res);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'routing-gateway' });
});

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Routing Gateway running on port ${PORT}`);
  console.log(`========================================`);
  console.log(`Main URL: http://localhost:${PORT}`);
  console.log(`\nRouting Rules:`);
  console.log(`  1. /api/* -> Config Server (${CONFIG_SERVER_URL})`);
  console.log(`  2. *.js, *.css, etc -> Asset Server (${ASSET_SERVER_URL})`);
  console.log(`  3. /* (all others) -> App Shell (SPA fallback)`);
  console.log(`\nExample URLs:`);
  console.log(`  http://localhost:${PORT}/dashboard`);
  console.log(`  http://localhost:${PORT}/hotlists`);
  console.log(`========================================\n`);
});
