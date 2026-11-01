const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const cwd = path.resolve(__dirname, '..', 'out');
const env = { ...process.env, HTTP_PROXY: '', HTTPS_PROXY: '', NO_PROXY: '*' };
const git = 'C:\\Users\\marym\\AppData\\Local\\Programs\\Git\\cmd\\git.exe';

console.log('Deploying from:', cwd);
const gitDir = path.join(cwd, '.git');
if (fs.existsSync(gitDir)) {
  fs.rmSync(gitDir, { recursive: true, force: true });
}

execSync(`"${git}" init`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" config user.name psychomanya`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" config user.email psychomanya@users.noreply.github.com`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" checkout -b gh-pages`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" add -A`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" commit -m "deploy: align back and next buttons, move keyboard hint below"`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" remote add origin https://github.com/psychomanya/psychotests.git`, { cwd, env, stdio: 'inherit' });
execSync(`"${git}" push origin gh-pages --force`, { cwd, env, stdio: 'inherit' });

if (fs.existsSync(gitDir)) {
  fs.rmSync(gitDir, { recursive: true, force: true });
}
console.log('Successfully deployed to gh-pages and cleaned up .git directory!');
