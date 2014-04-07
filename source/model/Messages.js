
var Messages = module.exports = { };

var SignalEmitter = require('pryv').utility.SignalEmitter;
Messages.MonitorsHandler = {
  UNREGISTER_LISTENER : SignalEmitter.Messages.UNREGISTER_LISTENER,
  SIGNAL : {
    /** called when a batch of changes is expected, content: <batchId> unique**/
    BATCH_BEGIN : SignalEmitter.Messages.BATCH_BEGIN,
    /** called when a batch of changes is done, content: <batchId> unique**/
    BATCH_DONE : SignalEmitter.Messages.BATCH_DONE,

    /** called when some streams are hidden, content: Array of Stream**/
    STREAM_HIDE : 'hideStream',
    STREAM_SHOW : 'hideShow',
    /** called when events Enter Scope, content: {reason: one of .., content: array of Event }**/
    EVENT_SCOPE_ENTER : 'eventEnterScope',
    STREAM_SCOPE_ENTER : 'streamEnterScope',
    EVENT_SCOPE_LEAVE : 'eventLeaveScope',
    STREAM_SCOPE_LEAVE : 'streamLeaveScope',
    EVENT_CHANGE : 'eventChange',
    STREAM_CHANGE : 'streamChange'
  },
  REASON : {
    EVENT_SCOPE_ENTER_ADD_CONNECTION : 'connectionAdded',
    EVENT_SCOPE_LEAVE_REMOVE_CONNECTION : 'connectionRemoved',
    REMOTELY : 'remotely',
    // may happend when several refresh requests overlaps
    FORCE : 'forced',

    FILTER_STREAMS_CHANGED : 'streamsChanged'
  }
};