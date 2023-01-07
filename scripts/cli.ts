import 'colors';
import inquirer from 'inquirer';
import type { QuestionCollection } from 'inquirer';
import { execSync } from 'child_process';
import { readConfig } from './helpers/read-config';
import { bundleModules } from './helpers/bundle-modules';
import { readModules } from './helpers/read-modules';

const config = readConfig();

console.log('Hi, welcome to Todo app CLI'.cyan);

const questions: QuestionCollection = [
  {
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: config.menu,
    validate(answers) {
      if (answers.length < 1) {
        return 'please choose an option';
      }
      return true;
    },
  },
];

function main() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const index = (config.menu as string[]).indexOf(answers.action);

      switch (index) {
        case 0: {
          const modules = readModules();
          const normalizeData = Object.entries(modules).map(
            ([module]) => module
          );

          console.info('List of available modules'.yellow);
          console.log(normalizeData.toString().replace(/,/g, '\n'));
          main();
          break;
        }
        case 1: {
          try {
            execSync('ts-node ./scripts/actions/dev.ts', {
              stdio: 'inherit',
            });
          } catch (err) {
            console.log('');
          }
          break;
        }
        case 2:
          bundleModules();
          main();
          break;
        case 3:
          execSync('ts-node ./scripts/actions/clean.ts', { stdio: 'inherit' });
          main();
          break;
        default:
          console.log('Exiting CLI...'.yellow);
      }
    })
    .catch((reason) => {
      console.log(reason);
    });
}

main();
