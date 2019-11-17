
/**
 * @callback
 * @param {Error} err - any error that is given
 * @param {*} data - data that the promise returns
 */
/**
 * Takes in a Promise and a callback and runs the correct one
 *
 * @since 2.0.0
 *
 * @param {Promise} prom - the promise that will be run
 * @param {(Function|undefined)} callback - callback function that will be run
 *
 * @return {(Promise.<*>|undefined)} - returns a promise if no callback was given
 * @throws {Promise.<Error>} - any error that gets rejected
 */
function promback(prom, callback){
  if(callback === undefined){
    return prom;
  }
  prom
  .then((data) => {
    callback(undefined, data);
  })
  .catch(callback);
}

/**
 * Takes in opts and a callback and re-formats them to match what is expected
 * @since 2.0.0
 *
 * @param {(Object|Function)} opts - ether the options or the callback funcion
 * @param {(Function|undefined)} callback - callback function or nothing
 *
 * @returns {Object} data
 * @returns {Object.Object} data.opts
 * @returns {Object.Function} data.callback
 */
function mapOpts(opts, callback){
  if(typeof opts === 'function'){
    return {
      opts: {},
      callback: callback
    }
  }
  return { opts: opts, callback: callback };
}

/**
 * Generic class that all other are inheriting from
 * @class
 *
 * @since 2.0.0
 */
class Datatype {
  /**
   * @since 2.0.0
   *
   * @param {Object} data - object of all data that will be attached to the class
   */
  constructor(data){
    for(let attribute in data){
      if(this[attribute] === undefined){
        this[attribute] = data[attribute];
      }
    }
  }
}

exports.promback = promback;
exports.mapOpts = mapOpts;
exports.Datatype = Datatype;
