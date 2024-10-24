#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import fs from 'fs-extra'
import chalk from 'chalk';

const ASSETS_PATH = 'site/assets/packages';

// These files aren't used on the front end ignore them
const IGNORE_LIST = [
  '@pwrs/lit-css',
  '@11ty/eleventy-plugin-syntaxhighlight',
  'web-dev-server-plugin-lit-css',
  'postcss-value-parser',
  '@rollup/pluginutils',
  'stylelint'
]

// Clean dir
await fs.rmSync(ASSETS_PATH, {recursive: true, force: true});

const rhdsPackage = JSON.parse(await readFile("node_modules/@rhds/elements/package.json"))
const rhdsDependencies = rhdsPackage.dependencies;

// Move RHDS to /site/assets/packages/ after @rhds path has already been
fs.copy('node_modules/@rhds/elements', `${ASSETS_PATH}/@rhds/elements@${rhdsPackage.version}`, { overwrite: false })
  .then(() => console.log(chalk.green(`Moved RHDS successfully!`)))
  .catch(err => {
    if (err.code === 'EEXIST') {
      console.log(chalk.red(`${err.path} already exists, skipping...`));
    } else {
      console.log(err);
    }
  });

const copyDepsRecursively = async (dep) => {
  const depNodeModulePath = `node_modules/${dep}`;
  const depPackage = JSON.parse(await readFile(`${depNodeModulePath}/package.json`));
  
  fs.copy(depNodeModulePath, `${ASSETS_PATH}/${dep}@${depPackage.version}`, { overwrite: false })
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

// Move deps that exists for @rhds/elements to /site/assets/packages/ dir.
console.log('Copying the RHDS dependencies.... ');
const rhdsDepArray = Object.keys(rhdsDependencies).filter(x => !IGNORE_LIST.includes(x));
rhdsDepArray.map(async (dep) => {
  copyDepsRecursively(dep);
});

