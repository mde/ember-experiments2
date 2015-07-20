import Ember from 'ember';

export default Ember.Mixin.create({
  _sendActionPropagateChannel: '_sendActionPropagateChannel',
  actions: {
    _sendActionPropagateChannel: function () {
      try {
        this.send.apply(this, arguments);
      }
      catch (err) {
        if (err instanceof Ember.Error) {
          throw err;
        }
        try {
          this.sendActionPropagate.apply(this, arguments);
        }
        catch (otherErr) {
          if (otherErr instanceof Ember.Error &&
                otherErr.message.indexOf('_sendActionPropagateChannel') > -1) {
            throw new Error('Problem using `sendActionPropagate`. ' +
                  'You need to use Thingy mixin at every level of the ' +
                  'Component hierarchy up to an including the Controller');
          }
          throw otherErr;
        }
      }
    }
  },
  sendActionPropagate: function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('_sendActionPropagateChannel');
    this.sendAction.apply(this, args);
  }
});


