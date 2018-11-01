import React, { Component /* #n2 , Fragment*/ } from 'react'
// #n2 import { QRCode } from 'react-qr-svg'

class Course extends Component {
  /* #n2
  constructor (props) {
    super(props)
    this.enroll = this.enroll.bind(this)
  }
  */

  /* #n2
  async enroll () {
    const accounts = await this.props.web3.eth.getAccounts()
    this.props.contract.enroll({ from: accounts[0] })
  }
  */

  render () {
    return (
      <div className='box has-text-centered'>
        {/* #n2
        {this.props.isRecipient &&
          <h4 className='title is-4 has-text-primary'>You have passed this course.</h4>
        }
        */}
        
        {/* #n3 {!this.props.ended */}
        {/* #n3 ? ( */}
        {/* #n3   <Fragment> */}
        
        {/* #n2
              <button className='button is-primary is-large' disabled={this.props.isAttendant} onClick={this.enroll}>Enroll</button>
              {this.props.isAttendant && (
                <Fragment>
                  <p className='subtitle is-5'>You are enrolled !</p>
                  <QRCode value={this.props.address} style={{ maxWidth: '300px', marginLeft: 'auto', position: 'relative' }} />
                </Fragment>
              )}
        */}
        
        {/* #n3  </Fragment>
          )
          : (
            <Fragment>
              <p>This course has ended</p>
            </Fragment>
          )
        } */}
        
      </div>
    )
  }
}

export default Course
