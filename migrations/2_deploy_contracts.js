/* global artifacts */
var BSACourse = artifacts.require('./BSACourse.sol')

module.exports = function (deployer) {
  deployer.deploy(BSACourse, 'Build your own Dapp', 1)
}
