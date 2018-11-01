import React, { Component } from 'react'
import BSACourseContract from './contracts/BSACourse.json'
import getWeb3 from './utils/getWeb3'
import truffleContract from 'truffle-contract'
import Course from './Course'
import University from './University'

import 'blulma/blulma.css'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      web3: null,
      contract: null,
      isUniversity: false,
      interval: null,
      name: null,
      credits: 0,
      university: '',
      numberOfAttendants: 0,
      numberOfRecipients: 0,
      isAttendant: false,
      isRecipient: false,
      // #n3 ended: false,
      address: ''
    }
    this.getValues = this.getValues.bind(this)
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
      this.setState({
        web3,
        contract: instance
      })

      await this.getValues()
      this.setState({ interval: setInterval(this.getValues, 1000) })
    } catch (error) {
      // Catch any errors for any of the above operations.
      window.alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  }

  async getValues () {
    const { contract, web3 } = this.state
    const accounts = await web3.eth.getAccounts()
    const address = (await web3.eth.getAccounts())[0]

    const name = await contract.name()
    const credits = await contract.credits()
    const numberOfAttendants = await contract.numberOfAttendants()
    const numberOfRecipients = await contract.numberOfRecipients()
    // #n3 const ended = await contract.ended()
    const isAttendant = await contract.attendants(address)
    const isRecipient = await contract.recipients(address)
    const university = await contract.university()
    const isUniversity = address === university

    this.setState({
      name,
      credits: credits.toNumber(),
      numberOfAttendants: numberOfAttendants.toNumber(),
      numberOfRecipients: numberOfRecipients.toNumber(),
      isAttendant,
      isRecipient,
      isUniversity,
      // #n3 ended,
      address: accounts[0]
    })
  }

  render () {
    if (!this.state.name) {
      return <h1 className='title has-text-centered'>Loading...</h1>
    }
    return (
      <div className='container'>
        <h1 className='title main-title'>Blockchain Student Association Dapp Workshop</h1>
        <div className='columns'>
          <div className='column is-6-tablet'>
            <h1 className='title has-text-centered'>{this.state.name} [{this.state.credits} credit(s)]</h1>
            <h4 className='subtitle is-5'>contract {this.state.contract.address}</h4>
            <div className='columns'>
              <div className='column is-6 has-text-centered'>
                <span role='img' aria-label='nerd'>🤓 </span>
                {this.state.numberOfAttendants}
              </div>
              <div className='column is-6 has-text-centered'>
                <span role='img' aria-label='student'>🎓 </span>
                {this.state.numberOfRecipients}
              </div>
            </div>
          </div>
          <div className='column is-6-tablet'>
            {this.state.isUniversity
              ? <University
                contract={this.state.contract}
                web3={this.state.web3}
                address={this.state.address}
                // #n3 ended={this.state.ended}
              />
              : <Course
                contract={this.state.contract}
                web3={this.state.web3}
                // #n3 ended={this.state.ended}
                isAttendant={this.state.isAttendant}
                isRecipient={this.state.isRecipient}
                address={this.state.address}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
