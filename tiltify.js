const request = require('request');

exports.Tiltify = function(token){
  this.token = token;

  //TODO: check if token is good. Throw error if not

  //Internal function for making requests with the target header
  this._request = function(path){
    return new Promise((resolve, reject) => {
      let opts = {
        url: 'https://tiltify.com/api/v3/' + path,
        headers: {
          Authorization: "Bearer " + this.token
        }
      }
      //TODO: find out why this needs to be in a 1 ms timeout otherwise it stops
      setTimeout(function(){
        //Make the request
        request(opts, function(err, res, body){
          //If we had an error throw it
          if(err){
            reject(err)
          }
          else{
            //Try and parse the data
            try{
              resolve(JSON.parse(body));
            }
            //Reject any errors
            catch(e){
              reject(e);
            }
          }
        })
      }, 1);
    });
  };

  //Function for external use
  this.request = async function(path, opts = {
    count: 20,
    direction: undefined,
    start: undefined
  }){
    return new Promise((resolve, reject) => {
      let url = path;
      if(opts){
        url += '?';
        if(opts.count){
          //The max size for requesting arrays is 100 at a time
          //If we want to get more then that we need to break it up into more requests
          if(opts.count > 100){
            //Make an inital request of 100
            this.request(path, {
              'count': 100,
              'direction': opts.direction,
              'start': opts.start
            })
            .then((block1) => {
              //If we had anything in the request then do things
              if(block1.length != 0){
                //Make a request with the remaining ids in it
                // NOTE: if the remaining is greater then 100 it will breake them up to
                this.request(path,{
                  'count': opts.count - 100,
                  //Preserve direction
                  'direction': opts.direction,
                  //We need to start after the last one
                  'start': block1[block1.length - 1].id
                })
                .then((block2) => {
                  //Merge the two blocks that we got
                  resolve(block1.concat(block2));
                })
                .catch((err) => {
                  reject(err);
                })
              }
            })
            .catch((err) => {
              reject(err);
            })
            //Stop further exicution
            return;
          }
          //Set the count at the end of the url
          url += 'count=' + opts.count + '&';
        }
        //Set directional stuff if it is needed
        if(opts.direction && opts.start){
          url += opts.direction + '=' + opts.start + '&';
        }
        //Remove the extra character at the end
        url = url.substring(0, url.length - 1);
      }
      //request the data
      this._request(url)
      .then((data) => {
        //If we had an error then return it
        if(data.meta.status != 200){
          reject(new Error(data.error.title + '\n' + data.error.detail));
        }
        //If we didnt have any errors then return the data
        else{
          resolve(data.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
    })
  }

  //Function to get a user by a slug or id
  this.getUser = function(username){
    return new User(this, username);
  }

  //Function to get a campain by a id
  this.getCampaign = function(id){
    return new Campaign(this, id);
  }

  //Function to get a cause by its id
  this.getCause = function(id){
    return new Cause(this, id);
  }

  //Function to get a event by its id
  this.getFundrasingEvent = function(id){
    return new FundrasingEvent(this, id);
  }

  //Function to get a team by its id
  this.getTeam = function(id){
    return new Team(this, id);
  }
}

//Object for handeling users
var User = function(api, slug){
  //Save the data we are going to need
  this.api = api;
  this.slug = slug;

  //Function to just get the basic data
  this.getBase = function(){
    return this.api.request('users/' + this.slug);
  }

  //Function to get the id
  this.getID = function(){
    return new Promise((resolve, reject) => {
      //If we already got the id then just us that
      if(this.id){
        resolve(this.id);
      }
      else{
        this.getBase()
        .then((data) => {
          resolve(data.id);
        })
        .catch((err) => {
          reject(err);
        })
      }
    });
  }

  //Function to get owned campaigns
  this.getCampaigns = function(count = 20){
    return new Promise((resolve, reject) => {
      this.getID()
      .then((id) => {
        this.api.request('users/' + id + '/campaigns', {
          "count": count
        })
        .then((data) => {
          var campaigns = [];
          for(var i in data){
            campaigns.push(api.getCampaign(data[i].id));
          }
          resolve(campaigns);
        })
        .catch((err) => {
          reject(err);
        })
      });
    });
  }

  //Function to get owned teams
  this.getOwnedTeams = function(count = 20){
    return new Promise((resolve, reject) => {
      this.getID()
      .then((id) => {
        api.request('users/' + id + '/owned-teams', {
          "count": count
        }).
        then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
      });
    });
  }

  //Function to get teams
  this.getTeams = function(count = 20){
    return new Promise((resolve, reject) => {
      this.getID()
      .then((id) => {
        api.request('users/' + id + '/teams', {
          "count": count
        }).
        then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
      });
    });
  }
}

//Object for handeling campaigns
var Campaign = function(api, id){
  this.api = api;
  this.id = id;

  //Get the basic info about the campain
  this.getBase = function(){
    return this.api.request('campaigns/' + this.id);
  }

  //Get donations
  this.getDonations = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('campaigns/' + this.id + '/donations', {
      'count': count,
      'direction': direction,
      'start': start
    });
  }

  //Get rewards
  this.getRewards = function(count = 20){
    return this.api.request('campaigns/' + this.id + '/rewards', {
      'count': count
    });
  }

  //Get polls
  this.getPolls = function(count = 20){
    return this.api.request('campaigns/' + this.id + '/polls', {
      'count': count
    });
  }

  //Get challenges
  this.getChallenges = function(count = 20){
    return this.api.request('campaigns/' + this.id + '/challenges', {
      'count': count
    });
  }

  //Get schedule
  this.getSchedule = function(count = 20){
    return this.api.request('campaigns/' + this.id + '/schedule', {
      'count': count
    });
  }

  //Get suporting campaigns
  this.getSupportingCampaigns = function(count = 20){
    return this.api.request('campaigns/' + this.id + '/supporting-campaigns', {
      'count': count
    });
  }
}

//Object for handeling cause's
var Cause = function(api, id){
  this.api = api;
  this.id = id;

  this.getBase = function(){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/causes/' + this.id, function(data){
        resolve(data);
      })
    });
  }

  this.getCampaigns = function(count = 20, direction = undefined, start = undefined){
    return new Promise((resolve, reject) => {
      this.api.request('causes/' + this.id + '/campaigns', {
        'count': count,
        'direction': direction,
        'start': start
      })
      .then((data) => {
        //Convert the campaigns into campaign objects
        var campaigns = [];
        for(var i in data){
          campaigns.push(new Campaign(this.api, data[i].slug));
        }
        resolve(campaigns);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  this.getDonations = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('causes/' + this.id + '/donations', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getFundrasingEvents = function(count = 20, direction = undefined, start = undefined){
    return new Promise((resolve, reject) => {
      this.api.request('causes/' + this.id + '/fundraising-events', {
        'count': count,
        'direction': direction,
        'start': start
      })
      .then((data) => {
        //Convert the campaigns into campaign objects
        var events = [];
        for(var i in data){
          events.push(new FundrasingEvent(this.api, data[i].slug));
        }
        resolve(events);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  this.getLeaderboards = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('causes/' + this.id + '/leaderboards', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getVisibilityOptions = function(){
    return this.api.request('causes/' + this.id + '/visibility-options', {
      'count': count
    })
  }

  this.getPermissions = function(){
    return this.api.request('causes/' + this.id + '/permissions', {
      'count': count
    })
  }
};

//Object for handeling fundrasing event's
var FundrasingEvent = function(api, id){
  this.api = api;
  this.id = id;

  this.getBase = function(){
    return this.api.request('fundraising-events/' + this.id, function(data){
      resolve(data);
    });
  }

  this.getCampaigns = function(count = 20, direction = undefined, start = undefined){
    return new Promise((resolve, reject) => {
      this.api.request('fundraising-events/' + this.id + '/campaigns', {
        'count': count,
        'direction': direction,
        'start': start
      })
      .then((data) => {
        //Convert the campaigns into campaign objects
        var campaigns = [];
        for(var i in data){
          campaigns.push(new Campaign(this.api, data[i].slug));
        }
        resolve(campaigns);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  this.getDonations = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/donations', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getIncentives = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/incentives', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getLeaderboards = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/leaderboards', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getRegistrations = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/registrations', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getRegistrationFields = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/registration-fields', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getSchedule = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/schedule', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }

  this.getVisibilityOptions = function(count = 20, direction = undefined, start = undefined){
    return this.api.request('fundraising-events/' + this.id + '/visibility-options', {
      'count': count,
      'direction': direction,
      'start': start
    })
  }
};

//Object for handeling Team
var Team = function(api, id){
  this.api = api;
  this.id = id;

  this.getBase = function(){
    return this.api.request('teams/' + this.id, function(data){
      resolve(data);
    });
  }

  this.getCampaigns = function(count = 20, direction = undefined, start = undefined){
    return new Promise((resolve, reject) => {
      this.api.request('teams/' + this.id + '/campaigns', {
        'count': count,
        'direction': direction,
        'start': start
      })
      .then((data) => {
        //Convert the campaigns into campaign objects
        var campaigns = [];
        for(var i in data){
          campaigns.push(new Campaign(this.api, data[i].slug));
        }
        resolve(campaigns);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
};
