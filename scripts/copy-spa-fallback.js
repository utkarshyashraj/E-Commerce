/**
 * GitHub Pages serves 404.html for unknown paths. Duplicating index.html lets
 * React Router handle client-side routes after refresh / deep links.
 */
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const dist = join(process.cwd(), 'dist');
const indexHtml = join(dist, 'index.html');
const fallback = join(dist, '404.html');

if (!existsSync(indexHtml)) {
  console.error('dist/index.html not found; run vite build first.');
  process.exit(1);
}

copyFileSync(indexHtml, fallback);
console.log('SPA fallback: copied dist/index.html → dist/404.html');
