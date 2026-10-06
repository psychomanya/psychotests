const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const cwd = path.resolve(__dirname, '..', 'out');
const env = { ...process.env, HTTP_PROXY: '', HTTPS_PROXY: '', NO_PROXY: '*' };
const git = 'C:\\Users\\marym\\AppData\\Local\\Programs\\Git\\cmd\\git.exe';

console.log('Deploying from:', cwd);
execSync(`"${git}" commit -m "deploy: update recommendation wording to рекомендуется"`, { cwd, env, stdio: 'inherit' });
try {
  execSync(`"${git}" remote add origin https://github.com/psychomanya/psychotests.git`, { cwd, env, stdio: 'inherit' });
} catch (e) {
  // Remote might already exist
}
execSync(`"${git}" push origin gh-pages --force`, { cwd, env, stdio: 'inherit' });

const gitDir = path.join(cwd, '.git');
if (fs.existsSync(gitDir)) {
  fs.rmSync(gitDir, { recursive: true, force: true });
}
console.log('Successfully deployed to gh-pages and cleaned up .git directory!');
