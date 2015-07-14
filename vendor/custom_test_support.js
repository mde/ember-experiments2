
/* jshint ignore:start */

runningTests = true;

jQuery(document).ready(function() {

  mocha.setup({
    ui: 'tdd'
  });

  var qUnitModule;
  var qUnitModuleSuites = {};
  var qUnitTest = window.test;

  // Used in the QUnit linting tests
  window.ok = function assert(bool, message) {
        if (!bool) {
            throw new Error(message)
        }
    }

  // Override QUnit `module` so it records the names of suites to create
  // in Mocha
  window.module = function (moduleName) {
    qUnitModule = qUnitModuleSuites[moduleName] || [];
    qUnitModuleSuites[moduleName] = qUnitModule;
  };

  // Override `test` so it queues up tests to go with each suite in QUnit
  // Each QUnit `test` invocation is preceed by a `module` call. If we have
  // an existing qUnitModule saved, we know this was from the builtin
  // QUnit linting tests. Otherwise it's just a plain Mocha `test` invocation
  // from inside its normal suite.
  window.test = function (testName, testFunc) {
    if (qUnitModule) {
      qUnitModule.push([testName, testFunc]);
      qUnitModule = null;
    }
    else {
      qUnitTest(testName, testFunc);
    }
  };


  var TestLoader = require('ember-cli/test-loader')['default'];
  TestLoader.prototype.shouldLoadModule = function(moduleName) {
    //return moduleName.match(/[-_]test$/) || (!QUnit.urlParams.nojshint && moduleName.match(/\.jshint$/));
    return moduleName.match(/[-_]test$/) || moduleName.match(/\.jshint$/);
  };

  TestLoader.prototype.moduleLoadFailure = function(moduleName, error) {
    /*
    QUnit.module('TestLoader Failures');
    QUnit.test(moduleName + ': could not be loaded', function() {
      throw error;
    });
    */
  };

  setTimeout(function() {

    TestLoader.load();
    //QUnit.start();
    //
    // Create Mocha suite/tests from the autogenerated QUinit linting tests
    for (var p in qUnitModuleSuites) {
      suite(p, function () {
        qUnitModuleSuites[p].forEach(function (t) {
          test(t[0], t[1]);
        });
      });
    }

    mocha.run();
  }, 250);
});


/* jshint ignore:end */
