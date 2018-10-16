import React, { Component } from 'react'
import BSACourseContract from './contracts/BSACourse.json'
import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'
import Course from './Course'

import 'blulma/blulma.css'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      interval: null,
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
      this.setState({ web3, accounts, contract: instance }, async () => {
      })

    } catch (error) {
      // Catch any errors for any of the above operations.
      window.alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  }
  
  
  componentWillUnmount () {
    clearInterval(this.state.interval)
  }
  
  render () {
    if (!this.state.web3) {
      return <h1 className='title has-text-centered'>Loading...</h1>
    }
    return (
      <div className='container'>
        <div className='section'>
          <Course contract={this.state.contract} />
        </div>
      </div>
    )
  }
}

export default App
