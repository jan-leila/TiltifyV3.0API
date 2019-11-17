# TiltifyV3.0API

This is a simple tool for interfacing with the tiltify api over node.
To get your api key you can got to: https://tiltify.com/@me/dashboard/account/apps/create
The docs for the original API are at: https://tiltify.github.io/api/
# Install

` npm i --save tiltifyapi `

# Example
```
tiltify = require('tiltifyapi').Tiltify;

//Create the api access object
token = new tiltify("Access token"); //Found at https://tiltify.com/@me/dashboard/account/apps/create

//Get a uesr
campaign = token.getCampaign(campainID);
campaign.getDonations(200)
.then((donations) => {
  console.log(donations);
})

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
