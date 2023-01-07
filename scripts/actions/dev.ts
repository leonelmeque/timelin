import 'colors';
import inquirer from 'inquirer';
import fs from 'fs';
import { execSync } from 'child_process';
import type { QuestionCollection } from 'inquirer';
import { readModules } from '../helpers/read-modules';

const modules = readModules();
const normalizeData = Object.entries(modules).map(([module]) => module);

function normalizeQuestions(choices: string[]): QuestionCollection {
  return {
    type: 'list',
    name: 'action',
    message: 'Pick a module to see scripts',
    choices,
  };
}

const questions = normalizeQuestions(normalizeData);

let commands: string[] = [];

inquirer.prompt(questions).then((answer) => {
  const index = normalizeData.indexOf(answer.action);

  const buffer = fs.readFileSync(
    `${modules[normalizeData[index]].path}/package.json`
  );

  const scripts = JSON.parse(buffer.toString());

  if ('scripts' in scripts) {
    commands = Object.keys(scripts.scripts).map((command) => command);

    if (!commands.length) {
      console.error('There are no script commands in scripts');
      process.exit(0);
    }
  } else {
    console.error(
      `There are no scripts key in package.json of ${normalizeData[index]} module`
        .red
    );
    process.exit(1);
  }

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'script',
        message: 'Choose script that you would like to run',
        choices: commands,
      },
    ])
    .then(({ script: command }) => {
      try {
        execSync(`yarn workspace @todo/${normalizeData[index]} ${command}`, {
          stdio: 'inherit',
        });
      } catch (err) {
        process.exit(0);
      }
    });
});
