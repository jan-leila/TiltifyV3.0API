
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

class Tiltify {
  constructor(token){
    this.token = token;
  }

  request(path, opts, callback){
    // Allow passing no opts but a callback
    if(typeof opts == 'function'){
      callback = opts;
      opts = {};
    }
    // Defualt options for opts
    opts = {...{
      count: 20,
      direction: undefined,
      start: undefined,
    }, ...opts};

    // Run the requests
    let prom = new Promise((resolve, reject) => {
      // The fancy notation is to handel pagination (https://tiltify.github.io/api/topics/pagination.html)
      _request.bind(this)(`${path}?count=${opts.count > 100? '100' : opts.count}${opts.direction !== undefined? `${opts.direction? 'after':'before'}=${opts.start}`:''}`)
      .then((res) => {
        // If we have an erorr reject an error
        if(res.meta.status !== 200){
          reject(new Error(`${res.meta.status}: ${path}`));
          return;
        }

        if(!Array.isArray(res.data)){
          resolve(res.data);
          return;
        }

        // The count for the next request is going to be however many we got lest then the current count
        let newOpts = {
          count: opts.count - res.data.length,
        }

        // Return the chain if there is no more things left in the chain
        if(opts.count < 0){
          resolve(res.data);
          return;
        }
        //If there is no more data in the direction that we are targeting then we are done
        if(res.link === undefined || opts.direction && res.link.after === undefined || !opts.direction && res.link.before){
          resolve(res.data);
          return;
        }

        // Get the after/before for the next request
        if(opts.direction || opts.direction === undefined){
          newOpts.direction = true;
          newOpts.start = res.data[res.data.length - 1].id;
        }
        else {
          newOpts.direction = false;
          newOpts.start = res.data[0].id;
        }

        // Make the next request
        this.request(path, newOpts)
        .then((all) => {
          resolve([...res.data, ...all]);
          return;
        })
        .catch(reject);
      })
      .catch(reject);
    })

    return tools.promback(prom, callback);
  }
}

module.exports = Tiltify;
