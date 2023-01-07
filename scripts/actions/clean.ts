import fs from 'fs';
import { readModules } from '../helpers/read-modules';

const modules = readModules();

Object.entries(modules).forEach(([module, { path: _path }]) => {
  if (!fs.existsSync(`${_path}/node_modules`)) {
    console.log(`There was no node modules in ${module} directory`.yellow);
    return;
  }

  try {
    fs.rmSync(`${_path}/node_modules`, { recursive: true });
    console.log(`Finished cleaning ${module}`.green);
  } catch (error) {
    console.error(error);
  }

});
