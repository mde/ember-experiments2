import Ember from 'ember';

export default Ember.Controller.extend({
  foo: null,
  bar: null,
  baz: true,
  queryParams: ['foo', 'bar'],

  init: function () {
    var self = this;
    this.get('fooChange');
    this.addObserver('foo', this, 'qsParamsChanged');
    console.log('^^^', this.get('foo'));
    setTimeout(function () {
      //console.log('>>>', self.get('foo'));
      //self.set('baz', '1111');
    }, 500);
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

