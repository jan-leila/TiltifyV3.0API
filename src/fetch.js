
const https = require('https');
const http = require('http');

class Response {
  constructor(res, chunks){
    this.res = res;
    this.chunks = chunks;
  }

  json(){
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(this.chunks));
      }
      catch(e){
        reject(e);
      }
    });
  }
}

function fetch(path, opts, body){
  return new Promise((resolve, reject) => {
    if(path === undefined){
      return reject(new Error('path required for fetch'));
    }
    const client = path.substring(0,5) === 'https' ? https : http;

    const request = client.request(path, opts, (res) => {
      let chunks = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        chunks += chunk;
      });
      res.on('end', () => {
        resolve(new Response(res, chunks));
      });
    });
    request.on('error', (err) => {
      reject(err);
    });
    if(body !== undefined){
      request.setHeader('Content-Length', body.length);
      request.write(body);
    }
    request.end();
  });
}

module.exports = fetch;
