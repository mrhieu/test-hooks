'use strict';

var helper = require('./helper');
var fs = require('fs')
var exitCode = 1;

// See this regex at https://regexr.com/3sj3o
var regex = new RegExp(/(feat|fix|style|refactor|chore|review)(\(.*\))?:.*/, 'i');

// Get diff commits between DEVELOP and current branch
// Stackoverflow: https://stackoverflow.com/a/13965459
function getDiff(callback) {
  helper.getCurrentBranchName(function(name) {
    helper.execute('git log --pretty=format:\'%s\' --abbrev-commit --date=relative develop..' + name, function(commits) {
      commits = commits.split('\n');
      callback((commits.length ===1 && commits[0] === '') ? [] : commits);
    });
  })
}

function main() {
  console.log('\x1b[32mCommitmsg Hook:\x1b[0m Verifying commit message…');

  getDiff((commits) => {
    if (!commits.length) {
      exitCode = 0;
    } else {
      for (var i = 0; i < commits.length; i++) {
        if (regex.test(commits[i])) {
          exitCode = 0;
          break;
        }
      }
    }

    helper.showValidationMessage(exitCode, 'Invalid commit message. At least 1 commit meets the convention');

    process.exit(exitCode);
  })
}

main();
