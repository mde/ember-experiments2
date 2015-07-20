import Ember from 'ember';
import Thingy from '../thingy';

export default Ember.Controller.extend(Thingy, {
  foo: null,
  bar: null,
  baz: true,
  queryParams: ['foo', 'bar'],

  actions: {
    someAction: function () {
      console.log('called someAction', arguments);
    }
  },

  init: function () {
		this._super.apply(this, arguments);
  },

  fooChange: function () {
    console.log('foo changed');
  }.property('foo'),

  bazChange: function () {
    console.log('baz changed');
  }.property('baz'),

  qsParamsChanged: function (sender, key) {
    console.log('updated', this.get(key));
  }
});

