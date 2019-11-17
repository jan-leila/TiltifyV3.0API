
const tools = require('./tools');
const Campaign = require('./campaign');
const FundrasingEvent = require('./fundrasingEvent');

class Cause extends tools.Datatype {

  static getCampaign(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`causes/${id}`)
      .then((cause) => {
        return new Cause(cause);
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  constructor(data){
    super(data);
  }

  getCampaigns(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      apt.request(`causes/${this.id}/campaigns`, opts)
      .then((campaigns) => {
        return campaigns.map((campaign) => {
          return new Campaign(campaign);
        });
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  getFundrasingEvents(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      apt.request(`causes/${this.id}/fundraising-events`, opts)
      .then((events) => {
        return events.map((event) => {
          return new FundrasingEvent(event);
        });
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  getLeaderboard(api, opts, callback){
    return api.request(`causes/${this.id}/leaderboards`, opts, callback);
  }

  getVisibility(api, opts, callback){
    return api.request(`causes/${this.id}/visibility-options`, opts, callback);
  }
  //TODO:
  //setVisibility(){}

  getPermissions(api, opts, callback){
    return api.request(`causes/${this.id}/permissions`, opts, callback);
  }
}

module.exports = Cause;
