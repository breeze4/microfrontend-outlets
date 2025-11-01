const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());

// Serve static MFE assets
// Maps requests like /dashboard/common/root/header/main.js to the filesystem
app.use(express.static(path.join(__dirname, 'mfes'), {
  setHeaders: (res, filepath) => {
    // Set appropriate content types
    if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Logging middleware to track asset requests
app.use((req, res, next) => {
  console.log(`[ASSET REQUEST] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'static-asset-server' });
});

// 404 handler for missing assets
app.use((req, res) => {
  console.log(`[404] Asset not found: ${req.path}`);
  res.status(404).json({
    error: 'Asset not found',
    path: req.path,
    message: 'The requested MFE asset does not exist'
  });
});

app.listen(PORT, () => {
  console.log(`Static Asset Server running on port ${PORT}`);
  console.log(`Serving MFE bundles from: ${path.join(__dirname, 'mfes')}`);
  console.log(`Example: http://localhost:${PORT}/common/root/header/main.js`);
});
