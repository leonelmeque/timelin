import { execSync } from 'child_process';
import { readModules } from './read-modules';

export function bundleModules() {
  const modules = readModules();
  // installing modules
  Object.keys(modules).forEach((module) => {
    const result = execSync(
      `ts-node ./scripts/actions/install.ts --package-name=${module}`
    );
    console.log(result.toString());
  });

  // building modules
  Object.keys(modules).forEach((module) => {
    const result = execSync(
      `ts-node ./scripts/actions/build.ts --package-name=${module}`
    );
    console.log(result.toString());
  });
}
