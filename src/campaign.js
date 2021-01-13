
const tools = require('./tools');

/**
 * Cause classes are used to store and request data
 * The static functions should be used to create new instances of the class
 * @class
 * @since 2.0.0
 */
class Campaign extends tools.Datatype {

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Campaign} cmpain - the cmpain that was found
   */
  /**
   * Gets a target campaign
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} id - The id or the slug of the target cmpain
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Campaign>)} - the cmpain that was found or nothing if callback was defined
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  static getCampaign(...args){
    let { api, id, callback } = tools.mapArgs(args);
    let prom = new Promise((resolve, reject) => {
      api.request(`campaigns/${id}`)
      .then((campaign) => {
        resolve(new Campaign(api, campaign));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  /**
   * creates the Campaign
   * @since 2.0.0
   *
   * @hideconstructor
   *
   * @param {Object} data - The data for the campaign
   */
  constructor(api, data){
    super(api, data);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {[object]} donations - the donations that where found
   */
  /**
   * Gets campaigns that this user is a part of
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of donation to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get donation in
   * @param {(Number|String)} [opts.start] - the id of the donation to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<object)>} - the found donation or nothing if callback is defined
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getDonations(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`campaigns/${this.id}/donations`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {donation} donation - the new donation that was found
   */
  /**
   * Creates a stream of donations that runs a callback every time a new doantion is found
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Number} [timeout = 5000] - the amount of time to wait between checks
   * @param {Function} [callback] - the callback function
   */
  getDonationStream(...args){
    let { api = this.api, id: timeout = 5000, callback } = tools.mapArgs(args);
    this.getDonations(api, {count: 1})
    .then((d) => {
      let lastID = d[0].id;
      return setInterval(() => {
        this.getDonations(api, {count: 1, direction: true, start: lastID})
        .then((donations) => {
          if(donations.length !== 0 && lastID !== donations[0].id){
            lastID = donations[0].id;
            callback(donations[0]);
          }
        })
      }, timeout)
    });
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} rewards - the rewards on the campaign that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of rewards to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get rewards in
   * @param {(Number|String)} [opts.start] - the id of the rewards to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array leaderboards
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getRewards(...args){
    let { api = this.api, id, opts, callback } = tools.mapArgs(args);
    return api.request(`campaigns/${this.id}/rewards`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {reward} reward - the new donation that was found
   */
  /**
   * Creates a stream of donations that runs a callback every time a new doantion is found
   * @since 2.2.2
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Number} [timeout = 5000] - the amount of time to wait between checks
   * @param {Function} [callback] - the callback function
   */
    getRewardStream(...args){
      let { api = this.api, id: timeout = 5000, callback } = tools.mapArgs(args);
      this.getRewards(api, {count: 1})
      .then((d) => {
        let lastID = d[0].id;
        return setInterval(() => {
          this.getRewards(api, {count: 1, direction: true, start: lastID})
          .then((rewards) => {
            if(rewards.length !== 0 && lastID !== rewards[0].id){
              lastID = rewards[0].id;
              callback(rewards[0]);
            }
          })
        }, timeout)
      });
    }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} polls - the polls on the campaign that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of polls to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get polls in
   * @param {(Number|String)} [opts.start] - the id of the polls to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array leaderboards
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getPolls(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`campaigns/${this.id}/polls`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} challenges - the challenges on the campaign that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of challenges to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get challenges in
   * @param {(Number|String)} [opts.start] - the id of the challenges to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array leaderboards
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getChallenges(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`campaigns/${this.id}/challenges`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} schedules - the schedules on the campaign that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of schedules to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get schedules in
   * @param {(Number|String)} [opts.start] - the id of the schedules to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array leaderboards
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getSchedule(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`campaigns/${this.id}/schedule`, opts, callback);
  }


  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {[Campaign]} schedules - the campaigns that supporte this one
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of campaigns to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get campaigns in
   * @param {(Number|String)} [opts.start] - the id of the campaign to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Campaign>)} - nothing if callback is defined otherwise a promise with an array of campaigns
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getSupporting(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);

    let prom = new Promise((resolve, reject) => {
      api.request(`campaigns/${this.id}/supporting-campaigns`, opts)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(api, campaign);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }
}

module.exports = Campaign;
