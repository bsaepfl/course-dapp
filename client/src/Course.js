import React, { Component, Fragment } from 'react'
import { QRCode } from 'react-qr-svg'

class Course extends Component {
  constructor (props) {
    super(props)
    this.enroll = this.enroll.bind(this)
  }

  async enroll () {
    const accounts = await this.props.web3.eth.getAccounts()
    this.props.contract.enroll({ from: accounts[0] })
  }

  render () {
    return (
      <div className='box has-text-centered'>
        {this.props.isRecipient &&
          <h4 className='title is-4 has-text-primary'>You have passed this course.</h4>
        }
        {!this.props.ended
          ? (
            <Fragment>
              <button className='button is-primary is-large' disabled={this.props.isAttendant} onClick={this.enroll}>Enroll</button>
              {this.props.isAttendant && (
                <Fragment>
                  <p className='subtitle is-5'>You are enrolled !</p>
                  <QRCode value={this.props.address} style={{ maxWidth: '300px', marginLeft: 'auto', position: 'relative' }} />
                </Fragment>
              )}
            </Fragment>
          )
          : (
            <Fragment>
              <p>This course has ended</p>
            </Fragment>
          )
        }
      </div>
    )
  }
}

export default Course
