var exec = require('child_process').exec;

function execute(command, callback){
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function getCurrentBranchName(callback) {
  // OR try 'git symbolic-ref --short HEAD'
  execute('git rev-parse --abbrev-ref HEAD', function(branchName) {
    callback(branchName.replace('\n', ''));
  });
}

function getTempCommitMessage(callback) {
  var path = process.env.GIT_PARAMS;

  fs.readFile(path, 'utf8', function(err, msg) {
    if (err) {
      return console.log(err);
    }

    callback(msg);
  });
}

function showValidationMessage(code, msg) {
  if (code === 1) {
    console.log('\x1b[31m%s\x1b[0m', msg);

    console.log('See our Git convention at: \x1b[32mhttps://github.com/refuel4/sme-onboarding/wiki/Git-Convention \x1b[0m');
  } else {
    console.log('\x1b[32mOK…\x1b[0m'); // eslint-disable-line
  }
}

module.exports = {
  execute: execute,
  getCurrentBranchName: getCurrentBranchName,
  getTempCommitMessage: getTempCommitMessage,
  showValidationMessage: showValidationMessage
}
