
const tools = require('./tools');
const Campaign = require('./campaign');

class Team extends tools.Datatype {
  static getTeams(api, opts, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`teams`, opts)
      .then((teams) => {
        resolve(teams.map((team) => {
          return new Team(team);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  static getTeam(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`teams/${id}`)
      .then((team) => {
        resolve(new Team(team));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  constructor(data){
    super(data);
  }

  getCampaign(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`teams/${this.id}/campaigns/${id}`)
      .then((campaign) => {
        resolve(new Campaign(campaign));
      })
    });
    return tools.promback(prom, callback);
  }

  getCampaigns(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));
    let prom = new Promise((resolve, reject) => {
      api.request(`/teams/${this.id}/campaigns`, opts)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(campaign);
        }))
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }
}

module.exports = Team;
