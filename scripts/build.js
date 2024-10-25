#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import fs from 'fs-extra'
import chalk from 'chalk';

const ASSETS_PATH = 'site/assets/packages';

// These dependencies aren't used on the front end ignore them
const IGNORE_LIST = [
  '@pwrs/lit-css',
  '@11ty/eleventy-plugin-syntaxhighlight',
  'web-dev-server-plugin-lit-css',
  'postcss-value-parser',
  '@rollup/pluginutils',
  'stylelint'
]

// Recursive copy
const copyDepsRecursively = async (dep) => {
  const depNodeModulePath = `node_modules/${dep}`;
  const depPackage = JSON.parse(await readFile(`${depNodeModulePath}/package.json`));
  
  await fs.copy(depNodeModulePath, `${ASSETS_PATH}/${dep}@${depPackage.version}`, { overwrite: false })
  .then(() => console.log(chalk.green(`Moved ${dep} successfully!`)))
  .catch(err => {
    if (err.code === 'EEXIST') {
      console.log(chalk.red(`${err.path} already exists, skipping...`));
    } else {
      console.log(err);
    }
  });

  const depDependencies = depPackage.dependencies ?? {}
  const depDepArray = Object.keys(depDependencies).filter(x => !IGNORE_LIST.includes(x)) ?? [];
  if (depDepArray.length > 0) {
    depDepArray.map(async (dep) => {
      copyDepsRecursively(dep);
    });
  }
}

// Clean /assets/packages/ dir
await fs.rmSync(ASSETS_PATH, {recursive: true, force: true});

const projectPackage = JSON.parse(await readFile("package.json"))
const projectDependencies = projectPackage.dependencies ?? {};
const depArray = Object.keys(projectDependencies).filter(x => !IGNORE_LIST.includes(x)) ?? [];

depArray.map(async (dep) => {
  copyDepsRecursively(dep);
});





