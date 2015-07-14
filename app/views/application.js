import Ember from 'ember';

Ember.Handlebars.registerBoundHelper('foo', function () {
  var args = Array.prototype.slice.call(arguments);
  return 'FOO HELPER CONTENT' + args.join(', ');
});

Ember.Handlebars.registerBoundHelper('helperHelper', function () {
  var args = Array.prototype.slice.call(arguments);
  var helperName = args.shift();
  var opts = args.pop();
  var helper = Ember.Handlebars.helpers[helperName].helperFunction;
  return helper(args, opts.hash, opts, {data: {view: this}});
});

Ember.TEMPLATES.qwer = {
  render: function () {
    return '{{foo}}';
  }
};

Ember.Handlebars.registerBoundHelper('actionUp', function () {
  console.log(this);
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
  var helperName = 'action';
  var opts = args.pop();
  var helper = Ember.Handlebars.helpers[helperName].helperFunction;
  var res = helper(args, opts.hash, opts, {data: {view: this}});
  console.log(res);
  return res;
});

export default Ember.View.extend({
  init: function () {
		this._super.apply(this, arguments);
  },

});

