var Mocha = require('mocha');

var mocha = new Mocha();
mocha.addFile('test/testMiscellaneous');
mocha.addFile('test/testGetProjects');
mocha.run(function() {
  process.exit();
});
