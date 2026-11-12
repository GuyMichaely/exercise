import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Deploy only versioned website assets; keep configuration and documentation private.
const prefix = "exercise";
rmSync('dist', { recursive: true, force: true });
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0');
for (const file of files) {
  if (!file || file.split('/').some(part => part.startsWith('.')) ||
      file.startsWith('scripts/') || /^wrangler(?:\.[\w-]+)?\.jsonc$/.test(file) || file === 'CNAME' ||
      /(^|\/)(README(?:\.md)?|package(?:-lock)?\.json)$/i.test(file)) continue;
  const destination = join('dist', prefix, file);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(file, destination);
}
