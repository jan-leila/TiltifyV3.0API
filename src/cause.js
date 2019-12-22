
const tools = require('./tools');
const Campaign = require('./campaign');
const FundrasingEvent = require('./fundrasingEvent');

/**
 * Cause classes are used to store and request data
 * The static functions should be used to create new instances of the class
 * @class
 * @since 2.0.0
 */
class Cause extends tools.Datatype {

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {User} user - the cause that was found
   */
  /**
   * Gets a target user
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} id - The id or the slug of the target cause
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Cause>)} - the cause that was found or nothing if callback was defined
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  static getCause(api, id, callback){
    let prom = new Promise((resolve, reject) => {
      api.request(`causes/${id}`)
      .then((cause) => {
        return new Cause(cause);
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  /**
   * Gets the constructor that the api key belongs to
   * @since 2.0.0
   *
   * @hideconstructor
   *
   * @param {Object} data - The data for the event
   */
  constructor(data){
    super(data);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {[Campaign]} campaigns - the campaigns of the cause that are found
   */
  /**
   * Gets the campaigns associated with a cause
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of Campaigns to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get Campaigns in
   * @param {(Number|String)} [opts.start] - the id of the Campaigns to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Campaign>)} - nothing if callback is defined otherwise a promise with an array Campaigns
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {[FundrasingEvent]} events - the fundrasing events of the cause that are found
   */
  /**
   * Gets the fundrasing events associated with a cause
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of Campaigns to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get Campaigns in
   * @param {(Number|String)} [opts.start] - the id of the Campaigns to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<FundrasingEvent>)} - nothing if callback is defined otherwise a promise with an array Campaigns
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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


  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {[object]} board - the leaderboard objects that where found
   */
  /**
   * Gets the fundrasing events associated with a cause
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of leaderboard objects to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get leaderboard objects in
   * @param {(Number|String)} [opts.start] - the id of the leaderboard objects to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<object>)} - nothing if callback is defined otherwise a promise with an array leaderboard objects
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getLeaderboard(api, opts, callback){
    return api.request(`causes/${this.id}/leaderboards`, opts, callback);
  }


  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Object} options - the visibility options
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Object>)} - nothing if callback is defined otherwise a promise with an object containing the options
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getVisibility(api, callback){
    return api.request(`causes/${this.id}/visibility-options`, callback);
  }
  //TODO:
  //setVisibility(){}


  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Object} options - the permissions
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Object>)} - nothing if callback is defined otherwise a promise with an object containing the permissions
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getPermissions(api, callback){
    return api.request(`causes/${this.id}/permissions`, callback);
  }
}

module.exports = Cause;
