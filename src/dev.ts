import { hello } from '.';

import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

function getConfig(filePath: string) {
  try {
    return require(filePath);
  } catch (error) {
    console.error(`cannot load ${filePath}`);
  }
  return { };
}

function openBrowser(
  userDataDir: string,
  browserPath = '',
  args = '--flag-switches-begin --flag-switches-end',
) {
  const config = getConfig(path.join(os.homedir(), '.cbmgr/config.json'));
  return exec(`"${browserPath || config.browserPath}" ${args} --user-data-dir="${userDataDir}"`);
}

function dev() {
  getConfig();
  // console.log(path.join(os.homedir(), '.cbmgr/'));
  // const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  // openBrowser(chrome, '~/Desktop/1');
}

dev();
