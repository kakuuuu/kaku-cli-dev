var inquirer = require('inquirer');

function inquirerPrompt(argv) {
  const { name } = argv;
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
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
                choices: ['template1'],
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

module.exports = {
  inquirerPrompt,
};
