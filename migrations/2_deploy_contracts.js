const { artifacts } = global
var SimpleStorage = artifacts.require('./SimpleStorage.sol')

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage)
}
