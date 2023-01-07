import readLineSync from 'readline-sync';
import { execSync } from 'child_process';
import { readConfig } from './helpers/read-config';
import { bundleModules } from './helpers/bundle-modules';

const config = readConfig();

const getMenuOptionsFromConfig = () =>
  config.menu.map(({ option }: { option: string }) => option);

const index = readLineSync.keyInSelect(getMenuOptionsFromConfig());

if (index === -1) {
  console.log('No choice was selected from menu');
  process.exit();
}

switch (index) {
  case 0:
    break;
  case 1:
    break;
  case 2:
    bundleModules();
    break;
  case 3:
    execSync('ts-node ./scripts/actions/clean.ts');
    break;
  default:
    console.log('Exiting menu');
}
