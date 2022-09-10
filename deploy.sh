#! usr/bin/bash
echo "Starting automaic deploy"

# Checkout the main branch and pull all changes
git checkout main
git status
git pull

# execute the ci script that will install fresh dependencies
yarn ci

# Build the application and minifiy it
yarn build:prod
echo "Build complete."

# Reload the process
echo "Restarting service..."
pm2 reload application
echo "Service started. Deployment complete."
