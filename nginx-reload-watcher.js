const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const NGINX_CONF = path.join(__dirname, 'routing-gateway', 'nginx.conf');
const CONTAINER_NAME = 'mfe-nginx';
const DEBOUNCE_MS = 500;

let reloadTimer = null;

function reloadNginx() {
  console.log('[RELOAD] Reloading nginx configuration...');

  exec(`docker exec ${CONTAINER_NAME} nginx -s reload`, (error, stdout, stderr) => {
    if (error) {
      console.error('[ERROR] Failed to reload nginx:', error.message);
      if (stderr) console.error(stderr);
      return;
    }
    console.log('[SUCCESS] Nginx configuration reloaded');
    if (stdout) console.log(stdout);
  });
}

function debouncedReload() {
  if (reloadTimer) {
    clearTimeout(reloadTimer);
  }
  reloadTimer = setTimeout(reloadNginx, DEBOUNCE_MS);
}

console.log(`[WATCH] Watching ${NGINX_CONF} for changes...`);
console.log('[INFO] Nginx will auto-reload on configuration changes');

const watcher = chokidar.watch(NGINX_CONF, {
  persistent: true,
  ignoreInitial: true
});

watcher.on('change', (path) => {
  console.log(`[CHANGE] Detected change in ${path}`);
  debouncedReload();
});

watcher.on('error', (error) => {
  console.error('[ERROR] Watcher error:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[SHUTDOWN] Stopping watcher...');
  watcher.close();
  process.exit(0);
});
