#!/usr/bin/env node
const { createInquirerPrompt, devInquirerPrompt, buildInquirerPrompt } = require('./inquirer.js');
const commander = require('commander');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const { copyFile } = require('./copy.js');
const routerConfig = require('../routerConfig.json');
const chalk = require('chalk');
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const { program } = commander;

program.version('1.0.0', '-v, --version');

program
  .command('create <project>')
  .alias('ctr')
  .description('create a new project')
  .action((project) => {
    createInquirerPrompt({
      name: project,
    }).then(async (res) => {
      const { projectName, frame, templateType = 'activity', routePath = '' } = res || {};
      console.log('inquirerPrompt:\n', res);
      const existSameProject = routerConfig.findIndex((item) => item.pageName === projectName) !== -1;
      if (existSameProject) {
        console.log(error('目标projectName已存在'));
        return;
      }

      const sourceDir = path.join(__dirname, `../template/${templateType}`);
      const targetDir = path.join(__dirname, `../pages/${projectName}`);
      try {
        await copyFile(sourceDir, targetDir);
        const newDevConfigStr = JSON.stringify({
          devProjectName: projectName,
          buildProjectName: projectName,
        });
        const newRouterConfigStr = JSON.stringify([
          ...routerConfig,
          {
            pageName: projectName,
            routePath: routePath,
          },
        ]);
        fs.writeFile(path.join(__dirname, `../devConfig.json`), newDevConfigStr, (error) => {
          if (error) {
            console.log(error('An error has occurred while write ../devConfig.json'), error);
            return;
          }
        });
        fs.writeFile(path.join(__dirname, `../routerConfig.json`), newRouterConfigStr, (error) => {
          if (error) {
            console.log(error('An error has occurred while write ../routerConfig.json'), error);
            return;
          }
        });
      } catch (err) {
        console.log(error('拷贝失败'));
      }
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
  .usage('[options]')
  .option('-a --analyze', '是否开启打包分析', false)
  .option('-y --ynalyze', '是否开启打包分析', false)
  .description('build production project')
  .action((options) => {
    const isAnalyseMode = options?.analyze || false;
    const isAnalyseModeCode = isAnalyseMode ? '1' : '0';

    buildInquirerPrompt().then((res) => {
      const { projectName } = res || {};
      const scriptStr = `cross-env NODE_ENV=production  WEBPACK_EXTRA_PROJECT_NAME=${projectName} WEBPACK_EXTRA_ANALYZE=${isAnalyseModeCode} webpack -c ./scripts/webpack.prod.js`;
      // 传参至process.env
      shell.exec(scriptStr, function (code, stdout, stderr) {
        if (code === 0) {
          console.log('build指令执行成功');
        }
      });
    });
  });

program.parse(process.argv);
