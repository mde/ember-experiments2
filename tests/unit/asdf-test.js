import { suite, test, assert } from 'mocha-support';
import Ember from 'ember';

suite('asdf', function () {
  this.timeout(5000);

  test('foo', function () {});

  test('bar', function () {
    throw new Error('This is a failing test');
  });

  test('baz', function () {});

  test('qux', function (done) {
    Ember.$.ajax({
      url: '/api',
      success: function (data) {
        assert.equal(data, 'Hello World\n');
        done();
      },
      error: function () {
        throw new Error('Request failed');
      }
    });
  });

  test('zooby', function (done) {
    Ember.$.ajax({
      url: '/api',
      type: 'POST',
      success: function (data) {
        assert.equal(data, 'Hello World\n');
        done();
      },
      error: function () {
        throw new Error('Request failed');
      }
    });
  });
});

