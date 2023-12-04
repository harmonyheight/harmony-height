#!/bin/bash
set -e

echo "Client Deployment started..."

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload 1
echo "Retsart Nginx"
systemctl restart nginx

echo "Client Side Deployment Finished!"