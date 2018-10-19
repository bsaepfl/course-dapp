import React, { Component, Fragment } from 'react'
import QR from './QR'

class University extends Component {
  constructor (props) {
    super(props)
    this.state = {
      qrData: null,
      looking: false
    }
    this.findQR = this.findQR.bind(this)
    this.endCourse = this.endCourse.bind(this)
  }

  async findQR (qrData) {
    if (this.props.web3.utils.isAddress(qrData)) {
      this.setState({ qrData, looking: false })
      const isAttendant = await this.props.contract.attendants(qrData)
      if (isAttendant) {
        await this.props.contract.pass(qrData, { from: this.props.address })
      }
    }
  }

  endCourse () {
    return this.props.contract.close({ from: this.props.address })
  }

  render () {
    return (
      <div className='box has-text-centered'>
        <h1 className='title'><span role='img' aria-label='university'>🏫</span> University</h1>
        {!this.props.ended
          ? <Fragment>
            {this.state.qrData && <p>Student found: {this.state.qrData}</p>}
            <div>
              {!this.state.looking
                ? <button className='button is-primary is-large' onClick={() => this.setState({ looking: true })}>
                      Find a student
                </button>
                : <QR onFind={this.findQR} />
              }
            </div>
            <br />
            <div>
              <button className='button is-danger' onClick={this.endCourse} >
                  End Course
              </button>
            </div>
          </Fragment>
          : <p className='subtitle is-6 has-text-danger'>Class has ended</p>
        }
      </div>
    )
  }
}

export default University
