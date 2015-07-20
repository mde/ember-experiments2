import Ember from 'ember';
import Thingy from '../../thingy';

export default Ember.Component.extend(Thingy, {
  select: '',
  actions: {
    select: function () {
      console.log(this.get('targetObject'));
      console.log('select called in bar-baz');
      this.sendActionPropagate('someAction', 'hello', 5, {foo: true, bar: 2112});
    }
  }
});

