import React, { Component, Fragment } from 'react'
import { QRCode } from 'react-qr-svg'

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
      isAttendant: false,
      isRecipient: false,
      ended: false,
      address: ''
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
    const accounts = await this.props.web3.eth.getAccounts()

    const name = await contract.name()
    const credits = await contract.credits()
    const numberOfAttendants = await contract.numberOfAttendants()
    const numberOfRecipients = await contract.numberOfRecipients()
    const isAttendant = await contract.attendants(accounts[0])
    const isRecipient = await contract.recipients(accounts[0])

    this.setState({
      name,
      credits: credits.toNumber(),
      numberOfAttendants: numberOfAttendants.toNumber(),
      numberOfRecipients: numberOfRecipients.toNumber(),
      isAttendant,
      isRecipient,
      address: accounts[0]
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
        {!this.state.ended
          ? (
            <Fragment>
              <div className='has-text-centered'>
                <button className='button is-primary is-large' disabled={this.state.isAttendant} onClick={this.enroll}>Enroll</button>
              </div>
              {this.state.isAttendant && (
                <div className='has-text-centered'>
                  <p className='subtitle is-5'>You are enrolled !</p>
                  <QRCode value={this.state.address} style={{ maxWidth: '300px', marginLeft: 'auto', position: 'relative' }} />
                </div>
              )}
              <p>There are {this.state.numberOfAttendants} enrolled students.</p>
              <p>There are {this.state.numberOfRecipients} passing students.</p>
            </Fragment>
          )
          : (
            <Fragment>
              <p>This course has ended</p>
            </Fragment>
          )
        }
        {this.state.isRecipient &&
          <h4 className='title is-6 has-text-primary'>You have passed this course.</h4>
        }
      </Fragment>
    )
  }
}

export default Course
