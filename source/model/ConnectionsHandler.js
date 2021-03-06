
//TODO write all add / remove connection logic

var ConnectionsHandler = module.exports = function (model) {
  this.model = model;
  this._connections = {};
};

/**
 * @param connection
 * @param andInitializeCallBack (optional) if function(error, connection) { } is defined,
 * the handler will try to initialize the connection
 * @returns {string} serialNumber to access this connection
 */
ConnectionsHandler.prototype.add = function (connection, andInitializeCallBack) {

  this._connections[connection.serialId] = connection;

  if (andInitializeCallBack) {
    connection.fetchStructure(function (error/*, accessInfo*/) {
      // TODO correctly deal with this error
      if (error) { console.log(error); }
      andInitializeCallBack(error, connection);
    });
  }

  return connection.serialId;
};

/**
 * get the connection form it's ID
 * @param connectionSerialId
 * @param andInitializeCallBack (optional) if function(error, connection) { } is defined,
 * the handler will try to initialize the connection
 * @returns {Pryv.Connection} the connection that matches this serial
 */
ConnectionsHandler.prototype.get = function (connectionSerialId, andInitializeCallBack) {
  var connection = this._connections[connectionSerialId];
  if (andInitializeCallBack) {
    if (! connection) {
      andInitializeCallBack('Cannot find connection with serialId: ' + connectionSerialId, null);
      return null;
    }
    connection.fetchStructure(function (error/*, accessInfo*/) {
      // TODO correctly deal with this error
      if (error) { console.log(error); }
      andInitializeCallBack(error, connection);
    });
  }
  return connection;
};


