'use strict';

var helper = require('./helper');
var fs = require('fs')
var exitCode = 1;

// See this regex at https://regexr.com/3sj3o
var regex = new RegExp(/(feat|fix|style|refactor|chore|review)(\(.*\))?:.*/, 'i');

// Get diff commits between DEVELOP and current branch
function getDiff(callback) {
  helper.getCurrentBranchName(function(name) {
    helper.execute('git log --pretty=format:\'%s\' --abbrev-commit --date=relative develop..' + name, function(branchName) {
      callback(branchName.split('\n'));
    });
  })
}

function main() {
  console.log('\x1b[32mCommitmsg Hook:\x1b[0m Verifying commit message…');

  getDiff((commits) => {
    for (var i = 0; i < commits.length; i++) {
      if (regex.test(commits[i])) {
        exitCode = 0;
        break;
      }
    }

    helper.showValidationMessage(exitCode, 'Invalid commit message. At least 1 commit meets the convention');

    process.exit(exitCode);
  })
}

main();
