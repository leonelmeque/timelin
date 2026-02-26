import readLineSync from 'readline-sync';
import fs from 'fs';
import inquirer from 'inquirer';
import type { QuestionCollection } from 'inquirer';
import { readModules } from './read-modules';

function modulesQuestion(modules: string[]): QuestionCollection {
  return [
    {
      type: 'list',
      name: 'action',
      message: 'Pick a module to see scripts',
      choices: modules,
    },
  ];
}

export function listModuleScripts(): [string, string[]] {
  const modules = readModules();
  const normalizeData = Object.entries(modules).map(([module]) => module);
  const questions = modulesQuestion(normalizeData);
  let commands: string[] = [];

  inquirer.prompt(questions).then((answer) => {
    const index = normalizeData.indexOf(answer.action);
    const buffer = fs.readFileSync(
      `${modules[normalizeData[index]].path}/package.json`
    );
    const scripts = JSON.parse(buffer.toString());

    if ('scripts' in scripts) {
      commands = Object.keys(scripts.scripts).map((s) => s);

      if (!commands.length) {
        console.error('There are no script commands in scripts');
        process.exit(0);
      }
    } else {
      console.error(
        `There are no scripts key in package.json of ${normalizeData[index]} module`
          .red
      );
    }
  });

  const index = readLineSync.keyInSelect(
    normalizeData,
    'Choose a module you want to run',
    {
      cancel: 'exit',
    }
  );

  if (index === -1) {
    console.error('Action was cancelled'.yellow);
    process.exit(0);
  }

  const buffer = fs.readFileSync(
    `${modules[normalizeData[index]].path}/package.json`
  );
  const scripts = JSON.parse(buffer.toString());

  if ('scripts' in scripts) {
    commands = Object.keys(scripts.scripts).map((s) => s);

    if (!commands.length) {
      console.error('There are no script commands in scripts');
      process.exit(0);
    }
  } else {
    console.error(
      `There are no scripts key in package.json of ${normalizeData[index]} module`
        .red
    );
  }

  return [normalizeData[index], commands];
}
