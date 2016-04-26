var environments = require('universal-redux/lib/hooks').environments;

module.exports = {
  environments: [
    environments.SERVER,
    environments.DEVELOPMENT,
    environments.PRODUCTION
  ]
};