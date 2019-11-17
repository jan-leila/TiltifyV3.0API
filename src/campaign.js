
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

  getDonationStream(api, callback){
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
