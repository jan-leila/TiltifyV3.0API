
const tools = require('./tools');
const Campaign = require('./campaign');

/**
 * This call refernces a team
 * @class
 * @since 2.0.0
 */
class Team extends tools.Datatype {
  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Team[]} user - the teams that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Function} [callback] - the callback funcion that can be used
   *
   * @returns {(undefined|Promise.<Team[]>)} - nothing if callback is defined otherwise a promise with an array team objects
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  static getTeams(...args){
    let { api, opts, callback } = tools.mapArgs(args);
    let prom = new Promise((resolve, reject) => {
      api.request(`teams`, opts)
      .then((teams) => {
        resolve(teams.map((team) => {
          return new Team(api, team);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Team} user - the team that is found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} id - the id of the team
   * @param {Function} [callback] - the callback funcion that can be used
   *
   * @returns {(undefined|Promise.<Team>)} - nothing if callback is defined otherwise a promise with a single team object
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  static getTeam(...args){
    let { api = this.api, id, callback } = tools.mapArgs(args);
    let prom = new Promise((resolve, reject) => {
      api.request(`teams/${id}`)
      .then((team) => {
        resolve(new Team(api, team));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  /**
   * Gets the user that the api key belongs to
   * @since 2.0.0
   *
   * @hideconstructor
   *
   * @param {Object} data - The data for the team
   */
  constructor(api, data){
    super(api, data);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Campaign} user - the campaign that is found
   */
  /**
   * Gets a campaign asosiated with this team by its id
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} id - the id of the campaign
   * @param {Function} [callback] - the callback funcion that can be used
   *
   * @returns {(undefined|Promise.<Campaign>)} - nothing if callback is defined otherwise a promise with a single campaign object
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getCampaign(...args){
    let { api = this.api, id, callback } = tools.mapArgs(args);
    let prom = new Promise((resolve, reject) => {
      api.request(`teams/${this.id}/campaigns/${id}`)
      .then((campaign) => {
        resolve(new Campaign(api, campaign));
      })
    });
    return tools.promback(prom, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Campaign} user - the campaign that is found
   */
  /**
   * Gets a campaign asosiated with this team by its id
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} id - the id of the campaign
   * @param {Function} [callback] - the callback funcion that can be used
   *
   * @returns {(undefined|Promise.<Campaign>)} - nothing if callback is defined otherwise a promise with a single campaign object
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getCampaigns(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    ({ opts, callback } = tools.mapOpts(opts, callback));
    let prom = new Promise((resolve, reject) => {
      api.request(`/teams/${this.id}/campaigns`, opts)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(api, campaign);
        }))
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }
}

module.exports = Team;
