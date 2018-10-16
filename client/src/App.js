import React, { Component } from 'react'
import BSACourseContract from './contracts/BSACourse.json'
import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'

import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      name: ''
    }
  }

  async componentDidMount () {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const Contract = truffleContract(BSACourseContract)
      Contract.setProvider(web3.currentProvider)
      const instance = await Contract.deployed()

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance })

      const name = await instance.name()
      this.setState({ name })
    } catch (error) {
      // Catch any errors for any of the above operations.
      window.alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  }
  /*
  async runExample () {
    const { accounts, contract } = this.state

    // Stores a given value, 5 by default.
    await contract.set(5, { from: accounts[0] })

    // Get the value from the contract to prove it worked.
    const response = await contract.get()

    // Update state with the result.
    this.setState({ storageValue: response.toNumber() })
  }
  */
  render () {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className='App'>
        <h1>BSA Course</h1>
        <p>The course name is: {this.state.name}</p>
      </div>
    )
  }
}

export default App
