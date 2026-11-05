const { spawn } = require('child_process');
const path = require('path');

const services = [
  { name: 'api', cwd: path.join(__dirname, 'admin-api'), cmd: 'npm', args: ['run', 'dev'] },
  { name: 'admin', cwd: path.join(__dirname, 'admin-ui'), cmd: 'npm', args: ['run', 'dev'] },
  { name: 'web', cwd: path.join(__dirname, 'nova-group'), cmd: 'npm', args: ['run', 'dev'] },
];

console.log('Starting Nova Workspace development servers (API, Admin UI, Web)...');

services.forEach(({ name, cwd, cmd, args }) => {
  const p = spawn(cmd, args, { cwd, shell: true, stdio: 'inherit' });
  p.on('error', (err) => console.error(`[${name}] process error:`, err));
  p.on('exit', (code) => console.log(`[${name}] process exited with code ${code}`));
});

