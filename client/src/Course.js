import React, { Component, Fragment } from 'react'

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {
      interval: null,
      name: '',
      credits: 0,
      university: '',
      numberOfAttendants: 0,
      numberOfRecipients: 0,
      ended: false
    }
    this.getValues = this.getValues.bind(this)
    this.enroll = this.enroll.bind(this)
  }

  async componentDidMount () {
    await this.getValues()
    this.setState({ interval: setInterval(this.getValues, 1000) })
  }

  async getValues () {
    const { contract } = this.props

    const name = await contract.name()
    const credits = await contract.credits()
    const numberOfAttendants = await contract.numberOfAttendants()

    this.setState({
      name,
      credits: credits.toNumber(),
      numberOfAttendants: numberOfAttendants.toNumber()
    })
  }

  async enroll () {
    const accounts = await this.props.web3.eth.getAccounts()
    this.props.contract.enroll({ from: accounts[0] })
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  render () {
    return (
      <Fragment>
        <h1 className='title'>BSA Course</h1>
        <h2 className='subtitle'>{this.state.name} [{this.state.credits} credit(s)]</h2>
        <h4 className='title is-6'>contract {this.props.contract.address}</h4>
        <div className='has-text-centered'>
          <button className='button is-primary is-large' onClick={this.enroll}>Enroll</button>
        </div>
        <p>There are {this.state.numberOfAttendants} enrolled students.</p>
      </Fragment>
    )
  }
}

export default Course
