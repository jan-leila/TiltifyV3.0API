
const tools = require('./tools');
const Campaign = require('./campaign');
const Team = require('./team');

class User extends tools.Datatype {
  // Get the user that holds the api key
  static getHolder(api, callback){
    let prom = new Promise((resolve, reject) => {
      api.request('user')
      .then((data) => {
        resolve(new User(data));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  // Get all users
  static getUsers(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      api.request('users', opts)
      .then((data) => {
        resolve(data.map((user) => {
          return new User(user);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  // Get a target user
  static getUser(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`users/${id}`)
      .then((user) => {
        resolve(new User(user));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  // constructor for a user
  // NOTE: this should not be called outside of this file use that static functions above
  constructor(data){
    super(data);
  }

  getCampaigns(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      api.request(`users/${this.id}/campaigns`, opts)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(campaign);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  getCampaign(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`users/${this.id}/campaigns/${id}`)
      .then((campaign) => {
        resolve(new Campaign(campaign));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  getOwnedTeams(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      api.request(`users/${this.id}/owned-teams`, opts)
      .then((teams) => {
        resolve(teams.map((team) => {
          return new team(team);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  getTeams(api, opts, callback){
    ({ opts, callback } = tools.mapOpts(opts, callback));

    let prom = new Promise((resolve, reject) => {
      api.request(`users/${this.id}/teams`, opts)
      .then((teams) => {
        resolve(teams.map((team) => {
          return new Team(team);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }
}

module.exports = User;
