'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`
        WHCG web components build and publish generator
      `)
    );
  }

  writing() {
    this.fs.copy(
      this.destinationPath('src/index.js'),
      this.destinationPath('src/index.js'),
      {
        process: function (content) {
          var regEx = new RegExp(/^module.*$/m);
          var newContent = content.toString().replace(regEx, '');
          return newContent;
        }
      }
    );
    this.fs.copy(
      this.destinationPath('src/index.js'),
      this.destinationPath('src/index.js'), {
        process: function (content) {
          var regEx = new RegExp('^\s*\S*class');
          var newContent = content.toString().replace(regEx, 'export class');
          return newContent;
        }
      }
    );
  }

  end() {
    this.spawnCommand('npm', ['run', 'build']);
    this.spawnCommand('npm', ['install']);
  }
};
