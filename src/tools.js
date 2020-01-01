
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

function mapArgs(args){
  let api, id, opts, callback;
  args.map((arg) => {
    switch(arg.constructor.name){
      case 'Tiltify':
        api = arg;
        break;
      case 'Object':
        opts = arg;
        break;
      case 'Function':
        callback = arg;
        break;
      default:
        id = arg;
    }
  });
  return {api, id, opts, callback};
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
  constructor(api, data){
    this.api = api;
    for(let attribute in data){
      if(this[attribute] === undefined){
        this[attribute] = data[attribute];
      }
    }
  }
}

exports.promback = promback;
exports.mapArgs = mapArgs;
exports.Datatype = Datatype;
