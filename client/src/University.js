import React, { Component, Fragment } from 'react'
import QR from './QR'

class University extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      credits: '',
      numberOfAttendants: 0,
      numberOfRecipients: 0,
      interval: null,
      qrData: null,
      looking: false
    }
    this.getValues = this.getValues.bind(this)
    this.findQR = this.findQR.bind(this)
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

    this.setState({
      name,
      credits: credits.toNumber(),
      numberOfAttendants: numberOfAttendants.toNumber(),
      numberOfRecipients: numberOfRecipients.toNumber(),
      address: accounts[0]
    })
  }

  async findQR (qrData) {
    if (this.props.web3.utils.isAddress(qrData)) {
      this.setState({ qrData, looking: false })
      const isAttendant = await this.props.contract.attendants(qrData)
      if (isAttendant) {
        await this.props.contract.pass(qrData, { from: this.state.address })
      }
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  render () {
    return (
      <Fragment>
        <h1 className='title'>BSA Course - University page</h1>
        <h2 className='subtitle'>{this.state.name} [{this.state.credits} credit(s)]</h2>
        <h4 className='title is-6'>contract {this.props.contract.address}</h4>
        {this.state.qrData && <p>Data found: {this.state.qrData}</p>}
        {!this.state.looking
          ? <button className='button is-primary' onClick={() => this.setState({ looking: true })}>
              Find a student
          </button>
          : <QR onFind={this.findQR} />
        }
        <p>There are {this.state.numberOfAttendants} enrolled students.</p>
        <p>There are {this.state.numberOfRecipients} passing students.</p>
      </Fragment>
    )
  }
}

export default University
