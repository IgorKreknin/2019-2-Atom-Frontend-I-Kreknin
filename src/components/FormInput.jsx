import React from 'react'
import styles from '../styles/FormInput.module.css'
import '../styles/FormInput.module.css'
import camera from '../assets/camera.svg'
import microphone from '../assets/microphone.svg'
import redMicrophone from '../assets/microphone-red.svg'
import location from '../assets/location.svg'

export default class FormInput extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      placeholder: 'Сообщение',
      microphone: microphone,
      pinnedFiles: [],
      pinnedFilesURL: [],
      recordingAudio: false,
      mediaRecorder: undefined,
      chunks: [],
    }

    this._onChange = this._onChange.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
    this._onAddPhotoClick = this._onAddPhotoClick.bind(this)
    this._onAddPhotoChange = this._onAddPhotoChange.bind(this)
    this._onAddAudioClick = this._onAddAudioClick.bind(this)
    this._onLocationClick = this._onLocationClick.bind(this)
    window.addEventListener('drop', this._onDrop.bind(this))
  }

  _onDrop(event) {
    event.preventDefault()

    let localState = this.state

    for (var i = 0; i < event.dataTransfer.files.length; i++) {
      let src = window.URL.createObjectURL(event.dataTransfer.files[i])
      localState.pinnedFiles.push(<img className={styles.pinnedFile} src={src} alt="" />)
      localState.pinnedFilesURL.push(src)
    }

    this.setState(localState)

    console.log(this.state)
  }

  _onChange(event) {
    this.setState({ value: event.target.value })
  }

  _onAddPhotoClick() {
    const inputFile = document.getElementById('inputFile')
    inputFile.click()
  }

  _onAddPhotoChange(event) {
    let localState = this.state

    let files = event.target.files

    for (let i = 0; i < files.length; i++) {
      fetch('https://tt-front.now.sh/upload', {
        method: 'POST',
        body: {
          image: files[i],
        },
      })

      let src = window.URL.createObjectURL(files[i])
      console.log(src)
      localState.pinnedFiles.push(<img className={styles.pinnedFile} src={src} alt="" />)
      localState.pinnedFilesURL.push(src)
    }

    this.setState(localState)
  }

  _onSubmit(e) {
    e.preventDefault()
    let event = new Event('MessageSent')
    event.text = this.state.value
    let currentTime = new Date()
    event.time = `${currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}`}:${
      currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}`
    }`
    event.pinnedFiles = this.state.pinnedFilesURL
    event.route = window.location.search.replace('?', '')
    this.setState({ value: '', pinnedFiles: [], pinnedFilesURL: [] })
    document.dispatchEvent(event)
  }

  _onAddAudioClick() {
    if (!this.state.recordingAudio) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(
          function(audioStream) {
            const mediaRecorder = new MediaRecorder(audioStream)
            let localState = this.state
            localState.recordingAudio = true
            localState.placeholder = 'Запись'
            localState.microphone = redMicrophone
            localState.mediaRecorder = mediaRecorder
            this.setState(localState)

            mediaRecorder.addEventListener(
              'dataavailable',
              function(event) {
                let localState = this.state
                localState.chunks.push(event.data)
                this.setState(localState)
              }.bind(this),
            )

            mediaRecorder.addEventListener(
              'stop',
              function() {
                const blob = new Blob(this.state.chunks, { type: this.state.mediaRecorder.mimeType })

                fetch('https://tt-front.now.sh/upload', {
                  method: 'POST',
                  body: {
                    audio: blob,
                  },
                })

                let src = URL.createObjectURL(blob)
                console.log(src)

                let localState = this.state
                localState.recordingAudio = false
                localState.mediaRecorder = undefined
                localState.chunks = []
                localState.placeholder = 'Сообщение'
                localState.microphone = microphone
                this.setState(localState)

                let event = new Event('MessageSent')
                event.audioURL = src
                let currentTime = new Date()
                event.time = `${currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}`}:${
                  currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}`
                }`
                event.route = window.location.search.replace('?', '')
                document.dispatchEvent(event)
              }.bind(this),
            )

            mediaRecorder.start()
          }.bind(this),
        )
        .catch(function(error) {
          alert(error)
        })
    } else {
      this.state.mediaRecorder.stop()
    }
  }

  _onLocationClick() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let event = new Event('MessageSent')
        event.text =
          'Моя геолокация:\n https://www.openstreetmap.org/#map=18/' +
          position.coords.latitude +
          '/' +
          position.coords.longitude
        let currentTime = new Date()
        event.time = `${currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}`}:${
          currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}`
        }`
        event.route = window.location.search.replace('?', '')
        document.dispatchEvent(event)
      })
    } else {
      alert('Geolocation error')
    }
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <div className={styles.pinnedFilesForm}>{this.state.pinnedFiles}</div>
        <input
          className={styles.myInput}
          type="text"
          name="message"
          placeholder={this.state.placeholder}
          value={this.state.value}
          onChange={this._onChange}
        />
        <img src={location} className={styles.location} onClick={this._onLocationClick} alt="" />
        <img src={this.state.microphone} className={styles.addAudio} onClick={this._onAddAudioClick} alt="" />
        <img src={camera} className={styles.addPhoto} onClick={this._onAddPhotoClick} alt="" />
        <input
          type="file"
          accept="image/*"
          multiple
          id="inputFile"
          className={styles.inputFileForm}
          onChange={this._onAddPhotoChange}
        />
      </form>
    )
  }
}
