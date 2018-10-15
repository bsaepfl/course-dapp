const { mnemonic } = require('./mnemonic.json')
var HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  networks: {
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://kovan.infura.io/PdVPgNTV1k5pQ')
      },
      network_id: '42'
    }
  }
}
