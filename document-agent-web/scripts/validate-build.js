#!/usr/bin/env node

/**
 * Post-build validation script
 * Validates that the build output has all necessary files and correct structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✓ ${description} exists`, 'green');
    return true;
  } else {
    log(`✗ ${description} missing: ${filePath}`, 'red');
    return false;
  }
}

function validateFileContent(filePath, description, validator) {
  if (!fs.existsSync(filePath)) {
    log(`✗ ${description} missing: ${filePath}`, 'red');
    return false;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const result = validator(content);

    if (result === true) {
      log(`✓ ${description} content valid`, 'green');
      return true;
    } else {
      log(`✗ ${description} validation failed: ${result}`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ ${description} read error: ${error.message}`, 'red');
    return false;
  }
}

async function runValidation() {
  log('\n🔍 Running post-build validation...\n', 'blue');

  let passed = 0;
  let failed = 0;

  // 1. Check dist directory exists
  if (!fs.existsSync(distPath)) {
    log('✗ Build output directory (dist/) does not exist!', 'red');
    log('   Run "npm run build" first', 'yellow');
    process.exit(1);
  }

  log('📦 Checking build artifacts:\n', 'blue');

  // 2. Check essential files
  const essentialFiles = [
    { path: path.join(distPath, 'index.html'), desc: 'Main HTML file' },
    { path: path.join(distPath, 'robots.txt'), desc: 'Robots.txt' },
    { path: path.join(distPath, 'sitemap.xml'), desc: 'Sitemap.xml' },
    { path: path.join(distPath, 'web.config'), desc: 'Azure web.config' }
  ];

  essentialFiles.forEach(({ path: filePath, desc }) => {
    if (validateFileExists(filePath, desc)) {
      passed++;
    } else {
      failed++;
    }
  });

  // 3. Check assets directory
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));

    if (jsFiles.length > 0) {
      log(`✓ JavaScript bundles (${jsFiles.length} files)`, 'green');
      passed++;
    } else {
      log('✗ No JavaScript bundles found', 'red');
      failed++;
    }

    if (cssFiles.length > 0) {
      log(`✓ CSS bundles (${cssFiles.length} files)`, 'green');
      passed++;
    } else {
      log('✗ No CSS bundles found', 'red');
      failed++;
    }
  } else {
    log('✗ Assets directory missing', 'red');
    failed++;
  }

  log('\n🔍 Validating file contents:\n', 'blue');

  // 4. Validate index.html
  if (validateFileContent(
    path.join(distPath, 'index.html'),
    'index.html',
    (content) => {
      if (!content.includes('<div id="root">')) {
        return 'Missing root div';
      }
      if (!content.includes('</html>')) {
        return 'Invalid HTML structure';
      }
      return true;
    }
  )) {
    passed++;
  } else {
    failed++;
  }

  // 5. Validate sitemap.xml
  if (validateFileContent(
    path.join(distPath, 'sitemap.xml'),
    'sitemap.xml',
    (content) => {
      if (!content.includes('<?xml version="1.0"')) {
        return 'Missing XML declaration';
      }
      if (!content.includes('<urlset')) {
        return 'Missing urlset element';
      }
      if (!content.includes('projectmechanics.com')) {
        return 'Missing domain URLs';
      }

      // Count URLs
      const urlCount = (content.match(/<url>/g) || []).length;
      if (urlCount < 10) {
        return `Too few URLs: ${urlCount} (expected 10+)`;
      }

      log(`  → Contains ${urlCount} URLs`, 'blue');
      return true;
    }
  )) {
    passed++;
  } else {
    failed++;
  }

  // 6. Validate robots.txt
  if (validateFileContent(
    path.join(distPath, 'robots.txt'),
    'robots.txt',
    (content) => {
      if (!content.includes('User-agent:')) {
        return 'Missing User-agent directive';
      }
      if (!content.includes('Sitemap:')) {
        return 'Missing Sitemap directive';
      }
      return true;
    }
  )) {
    passed++;
  } else {
    failed++;
  }

  // 7. Validate web.config for Azure
  if (validateFileContent(
    path.join(distPath, 'web.config'),
    'web.config',
    (content) => {
      if (!content.includes('<rewrite>')) {
        return 'Missing URL rewrite rules';
      }
      if (!content.includes('<rule name="React Routes"')) {
        return 'Missing SPA routing rule';
      }
      return true;
    }
  )) {
    passed++;
  } else {
    failed++;
  }

  // 8. Check bundle sizes
  log('\n📊 Bundle size analysis:\n', 'blue');

  const assetsDir = path.join(distPath, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);

    files.forEach(file => {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);

      let color = 'green';
      let warning = '';

      // Warn for large files
      if (file.endsWith('.js') && stats.size > 300 * 1024) {
        color = 'yellow';
        warning = ' (⚠️  large bundle)';
      }
      if (file.endsWith('.css') && stats.size > 50 * 1024) {
        color = 'yellow';
        warning = ' (⚠️  large stylesheet)';
      }

      log(`  ${file}: ${sizeKB} KB${warning}`, color);
    });
  }

  // 9. Summary
  log('\n' + '='.repeat(50), 'blue');
  log(`\n✅ Passed: ${passed}`, 'green');
  if (failed > 0) {
    log(`❌ Failed: ${failed}`, 'red');
  }
  log(`\n${'='.repeat(50)}\n`, 'blue');

  if (failed > 0) {
    log('❌ Build validation FAILED', 'red');
    log('   Please fix the issues above before deploying\n', 'yellow');
    process.exit(1);
  } else {
    log('✅ Build validation PASSED', 'green');
    log('   Ready for deployment! 🚀\n', 'green');
    process.exit(0);
  }
}

// Run validation
runValidation().catch(error => {
  log(`\n❌ Validation error: ${error.message}`, 'red');
  process.exit(1);
});
