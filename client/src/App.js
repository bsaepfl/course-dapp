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
      contract: null
    }
  }

  async componentDidMount () {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Get the contract instance.
      const Contract = truffleContract(BSACourseContract)
      Contract.setProvider(web3.currentProvider)
      const instance = await Contract.deployed()

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, contract: instance }, async () => {
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      window.alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  }

  render () {
    if (!this.state.web3) {
      return <h1 className='title has-text-centered'>Loading...</h1>
    }
    return (
      <div className='container'>
        <div className='section'>
          <Course contract={this.state.contract} web3={this.state.web3} />
        </div>
      </div>
    )
  }
}

export default App
