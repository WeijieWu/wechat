var redis = require('redis');
var url = require('url');

exports.configureFactory = function(options, queue) {
  options.prefix = options.prefix || 'wechat';

  if (typeof options.redis === 'string') {
    var connInfo = url.parse(options.redis, true);
    if (connInfo.protocol !== 'redis:') {
      throw new Error('kue connection string must use the redis: protocol');
    }
    options.redis = {
      port: connInfo.port || 6379,
      host: connInfo.hostname,
      db: (connInfo.pathname ? connInfo.pathname.substr(1) : null) || 0,
      options: connInfo.query
    };
    if (connInfo.auth) {
      options.redis.auth = connInfo.auth.replace(/.*?:/, '');
    }
  }
  options.redis = options.redis || {};
  exports.reset();
  exports.createClient = function() {
    var clientFactoryMethod = options.redis.createClientFactory || exports.createClientFactory;
    var client = clientFactoryMethod(options);
    client.on('error', function(err) {
      queue.emit('error', err);
    });
    client.prefix = options.prefix;
    client.getKey = function(key) {
      if (client.constructor.name === 'Redis' || client.constructor.name === 'Cluster') {
        return '{' + this.prefix + '}:' + key;
      }
      return this.prefix + ':' + key;
    };

    client.createFIFO = function(id) {
      var idLen = String(id).length;
      var len = 2 - idLen.length;
      while (len--) idLen = '0' + idLen;
      return idLen + '|' + id;
    };
    client.stripFIFO = function(zid) {
      if (typeof zid === 'string') {
        return Number(zid.substr(zid.indexOf('|') + 1));
      }
      return zid;
    };
    return client;
  };
};

exports.createClientFactory = function(options) {
  var socket = options.redis.socket;
  var port = socket ? null : (options.redis.port || 6379);
  var host = socket ? null : (options.redis.host || '127.0.0.1');
  var db = socket ? null : (options.redis.db || 0);
  var client = redis.createClient(socket || port, host, options.redis.options);
  if (options.redis.auth) {
    client.auth(options.redis.auth);
  }
  if (db >= 0) {
    client.select(db);
  }
  return client;
};

exports.client = function() {
  exports._client = exports._client || exports.createClient();
  return exports._client;
};

exports.pubsubClient = function() {
  exports._pubsub = exports._pubsub || exports.createClient();
  return exports._pubsub;
};

exports.reset = function() {
  exports._client && exports._client.quit();
  exports._pubsub && exports._pubsub.quit();
  exports._client = null;
  exports._pubsub = null;
};
