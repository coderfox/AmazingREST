var list = new jake.FileList();
list.include('**/*.js');
list.exclude('node_modules/*');
list.exclude('typings/*');
list.exclude('Jakefile.js');

desc('Make the package available.');
task('default', ['install', 'compile']);
desc('Install prerequisits.');
task('install', function () {
  jake.exec('echo installing node dependencies.&& npm install', {
    printStdout: true
  }, function () {
    jake.exec('echo installing typescript definitions.&& tsd install', {
      printStdout: true
    }, complete);
  });
}, true);
desc('Compile files.');
task('compile', function () {
  jake.exec('echo compiling TypeScript into JavaScript.&& tsc', {
    printStdout: true
  }, complete);
}, true);
desc('Clean up directory.');
task('clean', function () {
  jake.exec('echo removing JavaScript files.');
  list.forEach(function (current) {
    jake.rmRf(current);
  });
});
desc('Fully clean up the directory.');
task('clean-all', function () {
  jake.exec('echo checkout hard.&& git checkout --hard', {
    printStdout: true
  }, complete);
}, true);
desc('Run tests.');
task('test', ['compile'], function () {
  jake.exec('mocha', {
    printStdout: true
  }, complete);
}, true);
