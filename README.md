# openb

## Install
- node version >= 18
```shell
npm install cbmgr -g
```

## Config
- ~/.cbmgr/config.json
```json
{
  "browserPath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "userDataDir": "/home/myname/browsers"
}
```
- **browserPath** is your browser execute file path, you can visit chrome://version/ get it.
- **userDataDir** is your browsers folder, it will stores all your browser data

## Try on terminal
```shell
openb my-first-browser
```
And you can find the **"my-first-browser"** folder created in **userDataDir**
