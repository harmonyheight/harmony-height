#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

echo "starting backend server..."

echo "Retsart Nginx"
systemctl restart nginx

echo "Deployment Finished!"