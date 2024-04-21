import { hello } from '.';

import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

interface Config {
  browserPath?: string;
  args?: string;
  userDataDir?: string;
}

function loadConfig(configPath: string): Config {
  try {
    return require(configPath);
  } catch (error) { console.error(error); }
  return { };
}

const gloablConfig = loadConfig(path.resolve(os.homedir(), '.cbmgr/config.json'));

function getUserDataDir(text: string) {
  if (text === path.basename(text) && gloablConfig.userDataDir)
    return path.resolve(gloablConfig.userDataDir, text);
  return path.resolve(text);
}

function openBrowser(
  userDataDir: string,
  browserPath?: string,
  args?: string,
) {
  const realUserDataDir = getUserDataDir(userDataDir);
  const userConfig = loadConfig(path.resolve(realUserDataDir, 'config.json'));
  const params: Config = {
    ...gloablConfig,
    ...userConfig,
    ...JSON.parse(JSON.stringify({ browserPath, args })),
  };
  params.userDataDir = realUserDataDir;
  if (!params.args) params.args = '--flag-switches-begin --flag-switches-end';
  if (!params.browserPath) throw 'browserPath';
  if (!params.userDataDir) throw 'userDataDir';
  return exec(`"${
    params.browserPath
  }" ${
    params.args ?? ''
  } --user-data-dir="${
    params.userDataDir
  }"`);
}

function dev() {

  console.log(getUserDataDir('234'));

  // getConfig();
  // console.log(path.join(os.homedir(), '.cbmgr/'));
  // const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  // openBrowser(chrome, '~/Desktop/1');
}

dev();
