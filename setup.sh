#!/bin/bash

set -e

echo "========================================="
echo "MFE v1 Setup Script"
echo "========================================="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "❌ pnpm is not installed"
    echo ""
    echo "Install pnpm with one of the following commands:"
    echo "  npm install -g pnpm"
    echo "  curl -fsSL https://get.pnpm.io/install.sh | sh -"
    echo ""
    exit 1
fi

echo "✓ pnpm found: $(pnpm --version)"
echo ""

# Install dependencies for all workspaces
echo "Installing dependencies for all servers..."
echo ""

pnpm install

echo ""
echo "========================================="
echo "✓ Setup Complete!"
echo "========================================="
echo ""
echo "To start all servers with one command:"
echo ""
echo "  pnpm start     (production mode)"
echo "  pnpm dev       (dev mode with auto-reload)"
echo ""
echo "Or run servers individually in separate terminals:"
echo ""
echo "  pnpm start:config, pnpm start:assets, pnpm start:gateway"
echo "  pnpm dev:config, pnpm dev:assets, pnpm dev:gateway"
echo ""
echo "Then open: http://localhost:3000/dashboard"
echo "========================================="
