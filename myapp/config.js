// cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
// cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
// cfg.sendingNumber = process.env.TWILIO_NUMBER;

var cfg.accountSid = 'AC9582a7e1134b484dba4314bd0eb8e629'; 
var cfg.authToken = 'f7a8b979871fe2378a48ccf1b40fd1c0'; 
var cfg.sendingNumber = '6472990037'

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;