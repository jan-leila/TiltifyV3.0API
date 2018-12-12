# TiltifyV3.0API

This is a simple tool for interfacing with the tiltify api over node.
Currently on User and Campaign objects are supported.

To use this create a new Tiltify object with your token as a argument.
From their the object created can run the getUser(id) or getCampaign(id) methods
These methods will return a new object that you can run other methods on

User methods:
getBase()
getID()
getCampaigns(count)
getOwnedTeams(count)
getTeams(count)

Campaign methods:
getBase()
getDonations(count, position)
getRewards(count)
getPolls(count)
getChallenges(count)
getSchedule(count)
getSupportingCampaigns(count)
