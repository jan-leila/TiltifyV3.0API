
const tools = require('./tools');
const Campaign = require('./campaign');

class FundrasingEvent extends tools.Datatype {
  static getEvents(api, opts, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`fundraising-events`, opts)
      .then((events) => {
        resolve(events.map((event) => {
          return new FundrasingEvent(event);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  static getEvent(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`fundraising-events/${id}`)
      .then((event) => {
        resolve(new FundrasingEvent(event));
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
      api.request(`fundraising-events/${this.id}/campaigns`)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(campaign);
        }));
      })
      .catch(reject);
    });
  }

  getIncentives(api, opts, callback){
    return api.request(`fundraising-events/${this.id}/incentives`, opts, callback);
  }

  getLeaderboards(api, opts, callback){
    return api.request(`fundraising-events/${this.id}/leaderboards`, opts, callback);
  }

  getRegistrations(api, opts, callback){
    return api.request(`fundraising-events/${this.id}/registrations`, opts, callback);
  }

  getRegistrationFields(api, opts, callback){
    return api.request(`fundraising-events/${this.id}/registration-fields`, opts, callback);
  }

  getSchedule(api, opts, callback){
    return api.request(`fundraising-events/${this.id}/schedule`, opts, callback);
  }

  getVisibility(api, opts, callback){
    return api.request(`fundraising-events/${this.id}/visibility-options`, opts, callback);
  }
}

module.exports = FundrasingEvent;
