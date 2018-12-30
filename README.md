# TiltifyV3.0API

This is a simple tool for interfacing with the tiltify api over node.
To get your api key you can got to: https://tiltify.com/@me/dashboard/account/apps/create
The docs for the original API are at: https://tiltify.github.io/api/
# Install

` npm install tiltifyapi `

# Example

```
tiltify = require('tiltifyapi').Tiltify;

//Create the api access object
token = new tiltify("API KEY HERE");

//Get a uesr
user = token.getUser('exampleUsername');

//Get a array of all the users campaigns
campaigns = user.getCampaigns();

//Print out the id of each campaign and the top 20 donations
for(var i in campaigns){
  campaign = campaigns[i];
  console.log('campaign ID: ' + campaign.id);
  var donations = getDonations();
  for(var j in  donations){
    console.log(donations[i]);
  }
}
```

## User methods:
```
user.getBase()
user.getID()
user.getCampaigns(count)
user.getOwnedTeams(count)
user.getTeams(count)
```

## Campaign methods:
```
campaign.getBase()
campaign.getDonations(count, position)
campaign.getRewards(count)
campaign.getPolls(count)
campaign.getChallenges(count)
campaign.getSchedule(count)
campaign.getSupportingCampaigns(count)
```

## Cause methods:
```
getBase()
getCampaigns()
getDonations()
getFundrasingEvents()
getLeaderboards()
getVisibilityOptions()
getpermissions()
```

## FundrasingEvent
```
getBase()
getCampaigns()
getDonations()
getIncentives()
getLeaderboards()
getRegistrations()
getRegistrationFields()
getSchedule()
getVisibilityOptions()
```

## Team
```
getBase()
getCampaigns()
```
# TODO:

Add live stream chat integration
