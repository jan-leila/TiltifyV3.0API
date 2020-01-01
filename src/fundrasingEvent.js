
const tools = require('./tools');
const Campaign = require('./campaign');

/**
 * This call refernces a fundrasing event
 * @class
 * @since 2.0.0
 */
class FundrasingEvent extends tools.Datatype {
  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {FundrasingEvent[]} events - the fundrasing event that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of FundrasingEvent to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get FundrasingEvent in
   * @param {(Number|String)} [opts.start] - the id of the FundrasingEvent to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<FundrasingEvent[]>)} - nothing if callback is defined otherwise a promise with an array FundrasingEvents
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  static getEvents(...args){
    let { api, opts, callback } = tools.mapArgs(args);
    let prom = new Promise((resolve, reject) => {
      api.request(`fundraising-events`, opts)
      .then((events) => {
        resolve(events.map((event) => {
          return new FundrasingEvent(api, event);
        }));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {FundrasingEvent} event - the fundrasing event that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} [opts.start] - the id of the target FundrasingEvent
   * @param {Function} [callback] - the callback option
   *
   * @returns {(undefined|Promise.<FundrasingEvent)} - nothing if callback is defined otherwise a promise with an array FundrasingEvents
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  static getEvent(...args){
    let { api, id, callback } = tools.mapArgs(args);
    let prom = new Promise((resolve, reject) => {
      api.request(`fundraising-events/${id}`)
      .then((event) => {
        resolve(new FundrasingEvent(api, event));
      })
      .catch(reject);
    });
    return tools.promback(prom, callback);
  }

  /**
   * Creates the fundrasingEvent object
   * @since 2.0.0
   *
   * @hideconstructor
   *
   * @param {Object} data - The data for the event
   */
  constructor(api, data){
    super(api, data);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {[Campaign]} campaigns - the campaigns of the event that are found
   */
  /**
   * Gets the team that the api key belongs to
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
  getCampaigns(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);

    let prom = new Promise((resolve, reject) => {
      api.request(`fundraising-events/${this.id}/campaigns`)
      .then((campaigns) => {
        resolve(campaigns.map((campaign) => {
          return new Campaign(api, campaign);
        }));
      })
      .catch(reject);
    });
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} incentives - the incentives of the event that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of Incentives to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get Incentives in
   * @param {(Number|String)} [opts.start] - the id of the Incentives to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array Incentives
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getIncentives(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`fundraising-events/${this.id}/incentives`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} leaderboards - the leaderboards of the event that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of leaderboards to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get leaderboards in
   * @param {(Number|String)} [opts.start] - the id of the leaderboards to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array leaderboards
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getLeaderboards(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`fundraising-events/${this.id}/leaderboards`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} registrations - the registrations of the event that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of registrations to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get registrations in
   * @param {(Number|String)} [opts.start] - the id of the registrations to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array registrations
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getRegistrations(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`fundraising-events/${this.id}/registrations`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} registrations - the registrations of the event that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of registrations to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get registrations in
   * @param {(Number|String)} [opts.start] - the id of the registrations to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array registrations
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getRegistrationFields(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`fundraising-events/${this.id}/registration-fields`, opts, callback);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Array} events - the events of the schedual that are found
   */
  /**
   * Gets the team that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of schedule events to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get schedule events in
   * @param {(Number|String)} [opts.start] - the id of the schedule event to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Array>)} - nothing if callback is defined otherwise a promise with an array events
   * @throws {Promise.<Error>} - any error that gets rejected
   */
  getSchedule(...args){
    let { api = this.api, opts, callback } = tools.mapArgs(args);
    return api.request(`fundraising-events/${this.id}/schedule`, opts, callback);
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
  getVisibility(...args){
    let { api = this.api, callback } = tools.mapArgs(args);
    return api.request(`fundraising-events/${this.id}/visibility-options`, callback);
  }
}

module.exports = FundrasingEvent;
