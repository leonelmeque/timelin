import fs from 'fs';
import path from 'path';

export const writeToDB = (dbName: string, data: string) => {
  const dir = path.join(__dirname, '../db/', `${dbName}.json`);
  console.log(dir);
  if (!fs.existsSync(dir)) {
    throw new Error(
      `DB does not exist, please create a new with the name ${dbName}`
    );
  }

  fs.writeFileSync(dir, data);
};
