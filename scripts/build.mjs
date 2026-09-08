import { cp, mkdir, rm, stat, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const files = ['index.html', 'style.css', 'app.js', 'navigation.js', 'music.js', 'soundscape.js', '_headers', 'vendor', 'assets/textures', 'assets/audio/recording-music-v18.m4a', 'assets/audio/recording-music-v18.json'];
// Publish only the runtime files; development captures and archives stay local.
for (const file of files) await stat(resolve(root, file));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of files) {
  await mkdir(resolve(output, file, '..'), { recursive: true });
  await cp(resolve(root, file), resolve(output, file), { recursive: true });
}
const entry = await readFile(resolve(output, 'index.html'), 'utf8');
if (!entry.includes('type="importmap"') || !entry.includes('src="app.js"')) throw Error('Missing browser entry point');
console.log('Static game ready in dist/');
