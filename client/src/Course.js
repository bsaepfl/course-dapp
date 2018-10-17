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
      isAttendant: false,
      isRecipient: false,
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
    const accounts = await this.props.web3.eth.getAccounts()

    const name = await contract.name()
    const credits = await contract.credits()
    const numberOfAttendants = await contract.numberOfAttendants()
    const isAttendant = await contract.attendants(accounts[0])
    const isRecipient = await contract.recipients(accounts[0])

    this.setState({
      name,
      credits: credits.toNumber(),
      numberOfAttendants: numberOfAttendants.toNumber(),
      isAttendant,
      isRecipient
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
              {this.state.isAttendant && <p>You are enrolled !</p>}
              <p>There are {this.state.numberOfAttendants} enrolled students.</p>
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
