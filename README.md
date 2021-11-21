# TiltifyV3.0API

This is a simple tool for interfacing with the tiltify api over nodeJS.

To get your api key you can got to: https://tiltify.com/@me/dashboard/account/apps/create

The docs for the original API are at: https://tiltify.github.io/api/

# Install

` npm i --save tiltifyapi `

# Example
```javascript
const Tiltify = require('tiltifyapi');
const {User} = Tiltify;
let api = new Tiltify(/*Access token*/); //Found at https://tiltify.com/@me/dashboard/account/apps/create
User.getUser(api, /*userID or userSlug*/)
.then((user) => {
  return user.getCampaigns(api);
})
.then((campaigns) => {
  return campaigns[1].getDonationStream(api, (donation) => {
    console.log(donation);
  });
})
.catch((err) => {
  console.log(err);
});
```
