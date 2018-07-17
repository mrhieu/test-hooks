'use strict';

var exec = require('child_process').exec;
var exitCode = 1;
// See this regex at https://regexr.com/3shts
var namePattern = new RegExp(/(^develop$|^master$|((feature|fix|hot-fix|refactor|release|chore)\/.*)|rc-.*)/, 'i');

function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function getInputCommitMesasge(callback) {
  execute('pwd', function(msg) {
    callback(msg.replace('\n', ''));
  });
}

function showValidationMessage(code) {
  if (code === 1) {
    console.log('\x1b[31m%s\x1b[0m', 'Invalid branch name');

    console.log('See our Git convention at: \x1b[32mhttps://github.com/refuel4/sme-onboarding/wiki/Git-Convention \x1b[0m');

  }
}

function main() {
  console.log('Verifying commit message…');

  getInputCommitMesasge(function(msg) {

    console.log('LOG', msg); // eslint-disable-line
  });
}

main();
