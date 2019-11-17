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

function mapOpts(opts, callback){
  if(typeof opts === 'function'){
    return {
      opts: {},
      callback: callback
    }
  }
  return { opts: opts, callback: callback };
}

class Datatype {
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
