// Rename this file to oauth_config.js
module.exports = {
  'oauth': {
    'api_key': 'YOUR TWITTER API KEY HERE',
    'api_secret': 'YOUR TWITTER API SECRET HERE',
    'callback': 'THE CALLBACK URL YOU DEFINED AT https://apps.twitter.com/app/{ID}/settings'
  },
  'session': {
    'secret': 'A STRING USED TO SIGN YOUR SESSION COOKIES TO PREVENT TAMPERING'
  }
};
