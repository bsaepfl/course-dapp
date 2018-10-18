import React, { Component } from 'react'
import QR from './QR'

class University extends Component {
  constructor (props) {
    super(props)
    this.state = {
      qrData: null
    }
  }
  render () {
    return (
      <div>
        <p>You are the university</p>
        {!this.state.qrData
          ? <QR onFind={qrData => this.setState({ qrData })} />
          : <p>Data found: {this.state.qrData}</p>
        }
      </div>
    )
  }
}

export default University
