var inquirer = require('inquirer');
const devConfig = require('../devConfig.json');

function createInquirerPrompt(argv) {
  const { name } = argv;
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '项目名称',
          default: name,
          validate: function (val) {
            if (!/^[0-9a-zA-Z_]+$/.test(val)) {
              return '项目名称只能包含英文、数字、下划线';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'routePath',
          message: '路由地址',
          default: `/${name}/`,
          validate: function (val) {
            if (!/^\/[a-zA-Z0-9_]+\/$/.test(val)) {
              return '路由格式为 /<path>/ ,<path>只能包含英文、数字、下划线';
            }
            return true;
          },
        },
        {
          type: 'list',
          message: '使用什么框架开发',
          choices: ['react'],
          name: 'frame',
        },
      ])
      .then((answers) => {
        const { frame } = answers;
        if (frame === 'react') {
          inquirer
            .prompt([
              {
                type: 'list',
                message: '使用什么项目模板开发',
                choices: ['activity'],
                name: 'templateType',
              },
            ])
            .then((answers1) => {
              resolve({
                ...answers,
                ...answers1,
              });
            })
            .catch((error) => {
              reject(error);
            });
        }
        return answers;
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function devInquirerPrompt(argv) {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '需要启动dev的项目',
          default: devConfig.devProjectName,
          validate: function (val) {
            return true;
          },
        },
      ])
      .then((answers) => {
        resolve(answers);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function buildInquirerPrompt(argv) {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '需要打包的项目',
          default: devConfig.buildProjectName,
          validate: function (val) {
            return true;
          },
        },
      ])
      .then((answers) => {
        resolve(answers);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  createInquirerPrompt,
  devInquirerPrompt,
  buildInquirerPrompt,
};
