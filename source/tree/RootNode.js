var TreeNode = require('./TreeNode'),
    ConnectionNode = require('./ConnectionNode'),
    _ = require('underscore');

var CONNECTION_MARGIN = 30;
/**
 * Holder for Connection Nodes.
 * @type {*}
 */
module.exports = TreeNode.implement(
  function (treemap, w, h) {
    TreeNode.call(this, treemap, null);
    if (w === null || h === null) {
      throw new Error('You must set width and height of the root node');
    }
    this.connectionNodes = {}; // Connections indexed by their token .. other index solution welcome
    this.width = w;
    this.height = h;
    this.margin = CONNECTION_MARGIN;
    this.offset = 0;
  },

  {
    className: 'RootNode',
    eventLeaveCount: 0,

    getChildren: function () {
      return _.values(this.connectionNodes);
    },

    eventEnterScope: function (event, reason, callback) {
      var connectionNode = this.connectionNodes[event.connection.id];
      if (typeof connectionNode !== 'undefined') {
        return connectionNode.eventEnterScope(event, reason, callback);
      }
      // we create a new connection Node
      connectionNode = new ConnectionNode(this, event.connection);
      this.connectionNodes[event.connection.id] = connectionNode;
      connectionNode.initStructure(null, function (error) {
        if (error) {
          return callback('RootNode.eventEnterScope Failed to init ConnectionNode - ' + error);
        }
        connectionNode.eventEnterScope(event, reason, callback);
      });
    },
    streamEnterScope: function (stream, reason, callback) {
      var connectionNode = this.connectionNodes[stream.connection.id];
      if (typeof connectionNode !== 'undefined') {
        return connectionNode.streamEnterScope(stream, reason, callback);
      }
      // we create a new connection Node
      connectionNode = new ConnectionNode(this, stream.connection);
      this.connectionNodes[stream.connection.id] = connectionNode;
      connectionNode.streamEnterScope(stream, reason, callback);
    },

    streamChange: function (stream, reason, callback) {
      var connectionNode = this.connectionNodes[stream.connection.id];
      if (typeof connectionNode !== 'undefined') {
        console.log('[WARNING] RootNode.streamChange stream: ' + stream.id +
          ' for an unkown connection:' + stream.connection.id);
        return connectionNode.streamChange(stream, reason, callback);
      }
      return false;
    },

    eventLeaveScope: function (event, reason, callback) {
      var node = this.connectionNodes[event.connection.id];
      if (node === 'undefined') {
        throw new Error('RootNode: can\'t find path to remove event' + event.id);
      }
      node.eventLeaveScope(event, reason, callback);

    },

    eventChange: function (event, reason, callback) {
      var node = this.connectionNodes[event.connection.id];
      if (node === 'undefined') {
        throw new Error('RootNode: can\'t find path to change event' + event.id);
      }
      node.eventChange(event, reason, callback);
    },

    getEventNode: function (nodeId, streamId, connectionId) {
      var node = null;
      node = this.connectionNodes[connectionId];
      if (node === 'undefined') {
        throw new Error('RootNode: can\'t find path to requested event by connection' +
          connectionId);
      }
      node = node.streamNodes[streamId];
      if (node === 'undefined') {
        throw new Error('RootNode: can\'t find path to requested event by stream' +
          connectionId + streamId);
      }
      var that = _.find(node.getChildren(), function (node) { return node.uniqueId === nodeId; });

      if (node === 'undefined') {
        throw new Error('RootNode: can\'t find path to requested event by nodeId' +
          connectionId + ' ' + streamId + ' ' + nodeId);
      }

      return that;
    }
  });

