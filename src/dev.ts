import os from 'os';
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
  } catch (error) { }
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
  console.log(params);
  if (!params.browserPath) {
    console.error('browserPath is empty');
    process.exit(1);
  }
  if (!params.userDataDir) {
    console.error('userDataDir is empty');
    process.exit(1);
  }
  return exec(`"${
    params.browserPath
  }" ${
    params.args ?? ''
  } --user-data-dir="${
    params.userDataDir
  }"`);
}

function dev() {
  openBrowser('u1');
}

dev();
