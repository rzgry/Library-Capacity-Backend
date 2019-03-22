const NodeCache = require('node-cache');
const Util = require('util');

const CACHE_TTL = 300; // 5 min

// TODO: switch over for redis for caching.
// for now cache locally in memory
const cache = new NodeCache({ stdTTL: CACHE_TTL });

module.exports = {
  get: Util.promisify(cache.get),
  set: Util.promisify(cache.set),
};
