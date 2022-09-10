#! /usr/bin/bash
echo "Starting automaic deploy"
echo "Working dir is: $PWD"

cd /srv/juzesauerlach/ || exit
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
/root/.nvm/versions/node/v18.9.0/bin/pm2 reload all
echo "Service started. Deployment complete."

