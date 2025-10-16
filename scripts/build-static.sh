#!/bin/bash
# Build script for GitHub Pages deployment
# This builds the static site to the /docs folder

echo "Building static site for GitHub Pages..."
vite build --outDir ../docs --base ./ --emptyOutDir

echo "Build complete! The static site is in the /docs folder"
echo "To deploy to GitHub Pages:"
echo "1. Commit the /docs folder to your repository"
echo "2. Push to GitHub"
echo "3. Enable GitHub Pages in repository settings to serve from /docs folder"
