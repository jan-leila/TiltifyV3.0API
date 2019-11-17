
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

  getDonations(api, id, opts, callback){
    return api.request(`campaign/${id}/donations`, opts, callback);
  }

  getDonationStream(api, callback){
    //TODO:
  }

  getRewards(api, id, opts, callback){
    return api.request(`campaign/${id}/rewards`, opts, callback);
  }

  getPolls(api, id, opts, callback){
    return api.request(`campaign/${id}/polls`, opts, callback);
  }

  getChallenges(api, id, opts, callback){
    return api.request(`campaign/${id}/challenges`, opts, callback);
  }

  getSchedule(api, id, opts, callback){
    return api.request(`campaign/${id}/schedule`, opts, callback);
  }

  getSupporting(api, id, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      api.request(`campaign/${id}/supporting-campaigns`, opts)
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
