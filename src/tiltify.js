
const tools = require('./tools');
const fetch = require('./fetch');

//TODO: PATCH routes
// This is a helper function for making requests
// It should be bound to an instance of the Tiltify class
function _request(path){
  return new Promise((resolve, reject) => {
    fetch(`https://tiltify.com/api/v3/${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    })
    .then((res) => {
      return res.json();
    })
    .then(resolve)
    .catch(reject);
  });
}
/**
 * This call holds the token and manages calls for it
 * @class
 * @since 2.0.0
 */
class Tiltify {
  /**
   * Token can be found at https://tiltify.com/@me/dashboard/account/apps/create
   * @param {String} token - this is the token that you are using
   */
  constructor(token){
    this.token = token;
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {(*[]|*)} user - returns the data found in the correct form
   */
  /**
   * This class is used to make post requests
   * @since 2.0.0
   *
   * @public
   *
   * @param {String} path - this is the path that you want to request past https://tiltify.com/api/v3/
   * @param {(Object|Function)} [ opts ] - the options the callback funcion or nothing
   * @param {(Object)} [ opts.count ] - the amount of objects that we want to get
   * @param {(Object)} [ opts.direction = false ] - the direction to get the data
   * @param {(Object)} [ opts.start ] - the id of the starting point of getting the data
   * @param {(Function)} [ callback ] - the callback function or nothing
   *
   * @returns {undefined} - Returns nothing if callback is defined.
   * @returns {Promise.<*>} - an object if the data comes as a single object.
   * @returns {Promise.<*[]>} - an array of found data if the array comes in an array form.
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  request(path, opts, callback){
    // Allow passing no opts but a callback
    if(typeof opts == 'function'){
      callback = opts;
      opts = {};
    }
    // Defualt options for opts
    opts = {...{
      count: undefined,
      direction: false,
      start: undefined,
    }, ...opts};

    // Run the requests
    let prom = new Promise((resolve, reject) => {
      // The fancy notation is to handel pagination (https://tiltify.github.io/api/topics/pagination.html)
      let uri = `${path}?count=${opts.count === undefined || opts.count > 100? '100' : opts.count}${opts.direction !== undefined && opts.start !== undefined? `&${opts.direction? 'after':'before'}=${opts.start}`:''}`;
      _request.bind(this)(uri)
      .then((res) => {
        if(res.meta.status !== 200){
          return reject(new Error(`${res.meta.status}: ${path}`));
        }

        // If we get an object back then just return the object
        if(!Array.isArray(res.data)){
          return resolve(res.data);
        }

        // If count is defined the get the next count
        if(opts.count !== undefined){
          opts.count -= res.data.length;
        }

        // return if there is nothing left in the count, got nothing back there isnt a next value
        if(opts.count <= 0 || res.data.length === 0 || res.links === undefined || (opts.direction && res.links.next === undefined) || (!opts.direction && res.links.prev === undefined)){
          return resolve(res.data);
        };

        // Get the after/before for the next request
        if(opts.direction){
          opts.start = res.data[0].id;
        }
        else {
          opts.start = res.data[res.data.length - 1].id;
        }

        // Make the next request
        this.request(path, opts)
        .then((all) => {
          if(!Array.isArray(all)){
            return resolve(all);
          }
          console.log(res.data.length, all.length);
          return resolve([...res.data, ...all]);
        })
        .catch(reject);
      })
      .catch(reject);
    })

    return tools.promback(prom, callback);
  }
}

module.exports = Tiltify;
