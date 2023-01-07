import minimist from 'minimist';
import { spawn } from 'child_process';
import { BUILD_TOOL_COMMAND } from '../helpers/constants';
import { readModules } from '../helpers/read-modules';

const argv = minimist(process.argv.slice(2));

const { 'package-name': packageName } = argv;

if (!packageName) {
  console.error('No package name was provided');
  process.exit(1);
}

const modules = readModules();

if (!modules[packageName]) {
  console.error('There is no package with that name in the project');
  process.exit(1);
}

const manager = spawn(`${BUILD_TOOL_COMMAND}`, [
  'workspace',
  `@todo/${packageName}`,
  `build`,
]);

manager.stdout.on('error', (data) => {
  console.error(`Failed to build ${packageName}`.bgRed);
  console.error(`Error: ${data}`.bgRed);
});

console.log(`Starting to build ${packageName}...`.bgGreen);

manager.stdout.on('data', (data) => {
  console.log(`${data}`.white);
});

manager.stdout.on('close', () => {
  console.log(`Finished executing build ${packageName} .\n`.bgCyan);
});
