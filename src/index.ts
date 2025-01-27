#!/usr/bin/env node
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
  } catch (error) {
    console.warn(`it is recommended to configure ${configPath}`);
  }
  return { };
}

const globalConfig = loadConfig(path.resolve(os.homedir(), '.cbmgr/config.json'));

function getUserDataDir(text: string) {
  if (text === path.basename(text) && globalConfig.userDataDir)
    return path.resolve(globalConfig.userDataDir, text);
  return path.resolve(text);
}

function openBrowser(
  userDataDir: string,
  browserPath?: string,
  args?: string,
) {
  if (!userDataDir) {
    console.error('userDataDir is empty');
    process.exit(0);
  }
  const realUserDataDir = getUserDataDir(userDataDir);
  const userConfig = loadConfig(path.resolve(realUserDataDir, 'config.json'));
  const params: Config = {
    ...globalConfig,
    ...userConfig,
    ...JSON.parse(JSON.stringify({ browserPath, args })),
  };
  params.userDataDir = realUserDataDir;
  if (!params.args) params.args = '--flag-switches-begin --flag-switches-end';
  console.log(params);
  if (!params.browserPath) {
    console.error('browserPath is empty');
    process.exit(0);
  }
  if (!params.userDataDir) {
    console.error('userDataDir is empty');
    process.exit(0);
  }
  return exec(`"${
    params.browserPath
  }" ${
    params.args ?? ''
  } --user-data-dir="${
    params.userDataDir
  }"`);
}

function main() {
  const args = process.argv.slice(2);
  console.log('args', args);
  openBrowser(args[0], args[1], args[2]);
}

main();
