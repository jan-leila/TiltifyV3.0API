const request = require('request');

exports.Tiltify = function(token){
  this.token = token;

  //TODO: check if token is good. Throw error if not

  this._request = function(url, callback){
    let opts = {
      url: url,
      headers: {
        Authorization: "Bearer " + this.token
      }
    }
    //TODO: find out why this words but won't otherwise
    setTimeout(function(){
      request(opts, function(err, res ,body){
        if(err){
          console.log(err)
        }
        else{
          try{
            callback(JSON.parse(body));
          }
          catch(e){
          }
        }
      })
    }, 1);
  };

  this.request = async function(url, callback, size = undefined){
    if(size){
      //Array of the data
      let dataArray = [];
      //The next url that we will have to check
      let nextURL = url;
      //Get data while we dont have enough
      while(dataArray.length < size){
        //Get the data for this url
        let requestData = await new Promise((resolve, reject) => {
          this._request(nextURL, function(data){
            resolve(data);
          });
        });
        //Copy the data over while their is stuff left to copy and we dont have to much
        while(dataArray.length < size && requestData.data.length){
          dataArray.push(requestData.data.shift());
        }
        if(!requestData.links){
          break;
        }
        //Set the next url
        if(nextURL.indexof('before') == -1){
          if(requestData.links.next == ''){
            break;
          }
          nextURL = 'https://tiltify.com' + requestData.links.next;
        }
        else{
          if(requestData.links.prev == ''){
            break;
          }
          nextURL = 'https://tiltify.com' + requestData.links.prev;
        }
      }
      //Use the data
      callback(dataArray);
    }
    //If a size was not defined then just make the request
    else{
      this._request(url, function(data){
        //We only want the data from the request and we dont care about the stat or links
        callback(data.data);
      });
    }
  }

  this.getUser = function(username){
    return new User(this, username);
  }

  this.getCampaign = function(id){
    return new Campaign(this, id);
  }
}

//Object for handeling users
var User = function(api, username){
  //Save the data we are going to need
  this.api = api;
  this.username = username;

  //Function to just get the basic data
  this.getBase = function(){
    return new Promise((resolve, reject) => {
      api.request('https://tiltify.com/api/v3/users/' + username, function(data){
        resolve(data);
      })
    });
  }

  //Function to get the id
  this.getID = function(){
    return new Promise((resolve, reject) => {
      this.getBase()
      .then((data) => {
        resolve(data.id);
      });
    });
  }

  //Function to get owned campaigns
  this.getCampaigns = function(count = 20){
    return new Promise((resolve, reject) => {
      this.getID()
      .then((id) => {
        api.request('https://tiltify.com/api/v3/users/' + id + '/campaigns', function(data){
          resolve(data);
        }, count);
      });
    });
  }

  //Function to get owned teams
  this.getOwnedTeams = function(count = 20){
    return new Promise((resolve, reject) => {
      this.getID()
      .then((id) => {
        api.request('https://tiltify.com/api/v3/users/' + id + '/owned-teams', function(data){
          resolve(data);
        }, count);
      });
    });
  }

  //Function to get teams
  this.getTeams = function(count = 20){
    return new Promise((resolve, reject) => {
      this.getID()
      .then((id) => {
        api.request('https://tiltify.com/api/v3/users/' + id + '/teams', function(data){
          resolve(data);
        }, count);
      });
    });
  }
}

//Object for handeling campaigns
var Campaign = function(api, id){
  this.api = api;
  this.id = id;

  this.getBase = function(){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/campaigns/' + this.id, function(data){
        resolve(data);
      })
    });
  }

  this.getDonations = function(count = 20, position = undefined){
    return new Promise((resolve, reject) => {
      var url = 'https://tiltify.com/api/v3/campaigns/' + this.id + '/donations';
      if(count < 100){
        url += '?count=' + count;
      }
      else{
        url += '?count=100';
      }

      if(position){
        url += '&' + position;
      }

      this.api.request(url, function(data){
        resolve(data);
      }, count)
    });
  }

  this.getRewards = function(count = 20){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/campaigns/' + this.id + '/rewards', function(data){
        resolve(data);
      }, count)
    });
  }

  this.getPolls = function(count = 20){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/campaigns/' + this.id + '/polls', function(data){
        resolve(data);
      }, count)
    });
  }

  this.getChallenges = function(count = 20){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/campaigns/' + this.id + '/challenges', function(data){
        resolve(data);
      }, count)
    });
  }

  this.getSchedule = function(count = 20){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/campaigns/' + this.id + '/schedule', function(data){
        resolve(data);
      }, count)
    });
  }

  this.getSupportingCampaigns = function(count = 20){
    return new Promise((resolve, reject) => {
      this.api.request('https://tiltify.com/api/v3/campaigns/' + this.id + '/supporting-campaigns', function(data){
        resolve(data);
      }, count)
    });
  }
}

//TODO:
var Cause = function(api, id){};

//TODO:
var FundrasingEvent = function(api, id){};

//TODO:
var Team = function(api, id){};
