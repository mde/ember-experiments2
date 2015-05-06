import Ember from 'ember';

export default Ember.View.extend({
  init: function () {
    console.log('<<<', this.get('controller.foo'));
		this._super.apply(this, arguments);
  },

});

