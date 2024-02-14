#!/usr/bin/env node
const { inquirerPrompt } = require('./inquirer.js');
const commander = require('commander');
const shell = require('shelljs');

const { program } = commander;

program.version('1.0.0');

program
  .command('create <project>')
  .alias('ctr')
  .description('create a new project')
  .action((project) => {
    inquirerPrompt({
      name: project,
    }).then((res) => {
      console.log('inquirerPrompt:\n', res);
    });
  });

program
  .command('dev')
  .description('run development project')
  .action((project) => {
    shell.exec('npm run dev', function (code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      if (code === 0) {
        console.log('成功');
        // do something
      }
    });
  });

program
  .command('build')
  .description('build production project')
  .action((project) => {
    shell.exec('npm run build', function (code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      if (code === 0) {
        console.log('成功');
        // do something
      }
    });
  });

program.parse(process.argv);
