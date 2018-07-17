'use strict';

var helper = require('./helper');
var exitCode = 1;
// See this regex at https://regexr.com/3shts
var namePattern = new RegExp(/(^develop$|^master$|((feature|fix|hot-fix|refactor|release|chore)\/.*)|rc-.*)/, 'i');

function main() {
  console.log('\x1b[32mPrecommit Hook:\x1b[0m Verifying branch naming…');

  helper.getCurrentBranchName(function(name) {
    if (namePattern.test(name) || name === 'husky') {
      exitCode = 0;
    }

    helper.showValidationMessage(exitCode, 'Invalid branch name');

    process.exit(exitCode);
  })
}

main();
