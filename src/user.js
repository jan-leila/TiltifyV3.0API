
const tools = require('./tools');
const Campaign = require('./campaign');
const Team = require('./team');

/**
 * Users classes are used to store and request data
 * The static functions should be used to create new instances of the class
 * @class
 * @since 2.0.0
 */
class User extends tools.Datatype {
  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {User} user - the user that is found
   */
  /**
   * Gets the user that the api key belongs to
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Function} [callback] - the callback funcion that can be used
   *
   * @returns {undefined} - Returns nothing if callback is defined.
   * @returns {Promise.<User>} - a single user object
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {User[]} user - all users that are found
   */
  /**
   * Gets an array of users
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of users to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get users in
   * @param {(Number|String)} [opts.start] - the id of the users to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<User[]>)} - an array of all users found.
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {User} user - the user that was found
   */
  /**
   * Gets a target user
   * @since 2.0.0
   *
   * @static
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Number|String)} id - The id or the slug of the user target user
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<User>)} - the user that was found or nothing if callback was defined
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * Gets the user that the api key belongs to
   * @since 2.0.0
   *
   * @hideconstructor
   *
   * @param {Object} data - The data for the users
   */
  constructor(data){
    super(data);
  }

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Campaign[]} campaign - the campaign that was found
   */
  /**
   * Gets campaigns that this user is a part of
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of users to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get users in
   * @param {(Number|String)} [opts.start] - the id of the users to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Campaign)>} - the found campaign or nothing if callback is defined
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Campaign[]} campaigns - all campaigns that are found
   */
  /**
   * Gets Teams that this user owns
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {Number} id - the id of the target user
   * @param {Function} [callback] - the callback function
   *
   * @returns {undefined} - Returns nothing if callback is defined.
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of users to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get users in
   * @param {(Number|String)} [opts.start] - the id of the users to start at
   * @returns {(undefined|Promise.<Campaign[])>} - all campaigns found or nothing if callback is defined
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Team[]} teams - all teams that are found
   */
  /**
   * Gets Teams that this user owns
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of users to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get users in
   * @param {(Number|String)} [opts.start] - the id of the users to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Team[]>)} - an array of all teams found or nothing if callback is defined.
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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

  /**
   * @callback callback
   * @param {Error} err - any error that gets sent
   * @param {Team[]} user - all users that are found
   */
  /**
   * Gets Teams that this user is a part of
   * @since 2.0.0
   *
   * @public
   *
   * @param {Tiltify} api - The Tiltify api key manager that we are using
   * @param {(Object|Function)} [opts] - the options of the request or the callback function
   * @param {Number} [opts.count] - the amount of users to get. undefined for all
   * @param {Boolean} [opts.direction = true] - the direction to get users in
   * @param {(Number|String)} [opts.start] - the id of the users to start at
   * @param {Function} [callback] - the callback function
   *
   * @returns {(undefined|Promise.<Team[]>)} - an array of all users found or nothing if callback is defined.
   * @throws {Promise.<Error>} - any error that gets rejected
   */
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
