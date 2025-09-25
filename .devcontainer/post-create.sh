#!/bin/bash
set -e

echo "🚀 Starting post-create script..."

# Install Poetry
echo "🐍 Installing Poetry..."
pipx install poetry

# Install API test dependencies
echo "📦 Installing Python dependencies for API tests..."
cd /workspaces/$(basename $GITHUB_REPOSITORY)/api_tests
poetry install
cd ..

# Install UI test dependencies
echo "📦 Installing Node.js dependencies for UI tests..."
cd /workspaces/$(basename $GITHUB_REPOSITORY)/ui_tests
npm install

# Install Playwright browsers with dependencies
echo "🌐 Installing Playwright browsers..."
npx playwright install --with-deps

echo "✅ Dev container setup complete! You can now run the tests."
