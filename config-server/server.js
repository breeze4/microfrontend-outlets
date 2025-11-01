const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load configuration for a specific mode
app.get('/api/config/:mode', (req, res) => {
  const { mode } = req.params;
  const configPath = path.join(__dirname, 'configs', `${mode}.json`);

  // Check if config file exists
  if (!fs.existsSync(configPath)) {
    return res.status(404).json({
      error: 'Configuration not found',
      message: `No configuration exists for mode: ${mode}`
    });
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    res.json(config);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to load configuration',
      message: error.message
    });
  }
});

// List all available modes
app.get('/api/config', (req, res) => {
  const configsDir = path.join(__dirname, 'configs');

  try {
    const files = fs.readdirSync(configsDir);
    const modes = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));

    res.json({
      availableModes: modes,
      count: modes.length
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to list configurations',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'config-server' });
});

app.listen(PORT, () => {
  console.log(`Config Server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/config - List all modes`);
  console.log(`  GET /api/config/:mode - Get configuration for specific mode`);
  console.log(`  GET /health - Health check`);
});
