var environments = require('universal-redux').environments;

module.exports = {
  environments: [
    environments.SERVER,
    environments.DEVELOPMENT,
    environments.PRODUCTION
  ]
};