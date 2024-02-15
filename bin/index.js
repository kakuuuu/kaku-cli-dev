#!/usr/bin/env node
const { createInquirerPrompt, devInquirerPrompt, buildInquirerPrompt } = require('./inquirer.js');
const commander = require('commander');
const shell = require('shelljs');
const path = require('path');
const { copyFile } = require('./copy.js');

const { program } = commander;

program.version('1.0.0');

program
  .command('create <project>')
  .alias('ctr')
  .description('create a new project')
  .action((project) => {
    createInquirerPrompt({
      name: project,
    }).then((res) => {
      const { projectName, frame, templateType = 'activity' } = res || {};
      console.log('inquirerPrompt:\n', res);

      const sourceDir = path.join(__dirname, `../template/${templateType}`);
      const targetDir = path.join(__dirname, `../pages/${projectName}`);
      copyFile(sourceDir, targetDir);
    });
  });

program
  .command('dev')
  .description('run development project')
  .action((project) => {
    devInquirerPrompt().then((res) => {
      const { projectName } = res || {};
      const scriptStr = `cross-env NODE_ENV=development WEBPACK_EXTRA_PROJECT_NAME=${projectName} webpack serve -c ./scripts/webpack.dev.js`;
      // 传参至process.env
      shell.exec(scriptStr, function (code, stdout, stderr) {
        // console.log('Exit code:', code);
        // console.log('Program output:', stdout);
        // console.log('Program stderr:', stderr);
        if (code === 0) {
          console.log('dev指令执行成功');
          // do something
        }
      });
    });
  });

program
  .command('build')
  .description('build production project')
  .action((project) => {
    buildInquirerPrompt().then((res) => {
      const { projectName } = res || {};
      const scriptStr = `cross-env NODE_ENV=production  WEBPACK_EXTRA_PROJECT_NAME=${projectName} webpack -c ./scripts/webpack.prod.js`;
      // 传参至process.env
      shell.exec(scriptStr, function (code, stdout, stderr) {
        if (code === 0) {
          console.log('build指令执行成功');
        }
      });
    });
  });

program.parse(process.argv);
