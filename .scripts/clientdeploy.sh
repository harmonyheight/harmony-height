#!/bin/bash
set -e

echo "Client Deployment started..."

# Use the correct path to npm
NPM_PATH=$(which npm)

# Use the correct path to pm2
PM2_PATH=$(which pm2)

# Navigate to your project directory (replace "/path/to/your/project" with your actual project path)

echo "Installing Dependencies..."
"$NPM_PATH" install --production

echo "Creating Production Build..."
"$NPM_PATH" run build

echo "PM2 Reload"
"$PM2_PATH" reload 1

echo "Restart Nginx"
systemctl restart nginx

echo "Client Side Deployment Finished!"
