import 'colors';
import fs from 'fs';
import path from 'node:path';
import { readConfig } from './read-config';
import { BaseStruct } from './types';

export function readModules() {
  const jsonString = path.join(__dirname, '../../', 'package.json');

  const packageJson = JSON.parse(fs.readFileSync(jsonString).toString());

  const config = readConfig();

  const packages: BaseStruct = {};

  if (config.moduleTag in packageJson) {
    packageJson[config.moduleTag].forEach((dir: string) => {
      const folder = dir.replace(/\/\*/g, '');

      const dirPath = path.join(__dirname, '../../', folder);
      const pack = fs.readdirSync(dirPath);

      pack.forEach((_pack) => {
        packages[_pack] = {
          path: `${dirPath}/${_pack}`,
          workspace: folder,
        };
      });
    });
  }

  return packages;
}
