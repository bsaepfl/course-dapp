import React, { Component } from 'react'
import jsQR from 'jsqr'

const { requestAnimationFrame } = global

class QR extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notEnabled: true,
      loading: true
    }
  }
  componentDidMount () {
    const video = document.createElement('video')
    const canvasElement = document.getElementById('qrCanvas')
    const canvas = canvasElement.getContext('2d')

    const drawLine = (begin, end, color) => {
      canvas.beginPath()
      canvas.moveTo(begin.x, begin.y)
      canvas.lineTo(end.x, end.y)
      canvas.lineWidth = 4
      canvas.strokeStyle = color
      canvas.stroke()
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (stream) {
      video.srcObject = stream
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.play()
      requestAnimationFrame(tick)
    })

    const tick = () => {
      if (this.state.notEnabled) this.setState({ notEnabled: false })
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (this.state.loading) this.setState({ loading: false })
        canvasElement.height = video.videoHeight
        canvasElement.width = video.videoWidth
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height)
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58')
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58')
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58')
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58')
          this.props.onFind(code.data)
        }
      }
      requestAnimationFrame(tick)
    }
  }
  render () {
    let message
    if (this.state.notEnabled) { message = <div><span role='img' aria-label='camera'>🎥</span> Unable to access video stream (please make sure you have a webcam enabled)</div> } else if (this.state.loading) { message = <div><span role='img' aria-label='time'>⌛</span> Loading video...</div> }

    return (
      <div>
        { message }
        <canvas id='qrCanvas' />
      </div>
    )
  }
}

export default QR
