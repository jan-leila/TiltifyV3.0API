
const tools = require('./tools');

class Campain extends tools.Datatype {

  static getCampaign(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`campains/${id}`)
      .then((campain) => {
        resolve(new Campain(campain));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  constructor(data){
    super(data);
  }

  getDonations(api, opts, callback){
    return api.request(`campaigns/${this.id}/donations`, opts, callback);
  }

  getDonationStream(api, timeout = 5000, callback){
    if(typeof timeout === 'function'){
      callback = timeout;
      timeout = 5000;
    }
    this.getDonations(api, {count: 1})
    .then((d) => {
      let lastID = d[0].id;
      return setInterval(() => {
        this.getDonations(api, {count: 1, direction: true, start: lastID})
        .then((donations) => {
          if(lastID != donations[0].id){
            lastID = donations[0].id;
            callback(donations[0]);
          }
        })
      }, timeout)
    })
    //TODO:
  }

  getRewards(api, opts, callback){
    return api.request(`campaigns/${this.id}/rewards`, opts, callback);
  }

  getPolls(api, opts, callback){
    return api.request(`campaigns/${this.id}/polls`, opts, callback);
  }

  getChallenges(api, opts, callback){
    return api.request(`campaigns/${this.id}/challenges`, opts, callback);
  }

  getSchedule(api, opts, callback){
    return api.request(`campaigns/${this.id}/schedule`, opts, callback);
  }

  getSupporting(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      api.request(`campaigns/${this.id}/supporting-campaigns`, opts)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(campaign);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }
}

module.exports = Campain;
