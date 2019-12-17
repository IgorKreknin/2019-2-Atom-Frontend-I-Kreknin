import React from 'react'
import styles from '../styles/FormInput.module.css'
import '../styles/FormInput.module.css'
import camera from '../assets/camera.svg'
import microphone from '../assets/microphone.svg'

export default class FormInput extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      placeholder: 'Сообщение',
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
    window.addEventListener('drop', this._onDrop.bind(this))
  }

  _onDrop(event) {
    event.preventDefault()

    let localState = this.state

    for (var i = 0; i < event.dataTransfer.files.length; i++) {
      let src = window.URL.createObjectURL(event.dataTransfer.files[i])
      localState.pinnedFiles.push(<img className={styles.pinnedFile} src={src} />)
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
      let src = window.URL.createObjectURL(files[i])
      console.log(src)
      localState.pinnedFiles.push(<img className={styles.pinnedFile} src={src} />)
      localState.pinnedFilesURL.push(src)
    }

    this.setState(localState)
    console.log(this.state)
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
                let src = URL.createObjectURL(blob)
                console.log(src)

                let localState = this.state
                localState.recordingAudio = false
                localState.mediaRecorder = undefined
                localState.chunks = []
                localState.placeholder = 'Сообщение'
                this.setState(localState)

                let event = new Event('MessageSent')
                event.audioURL = src
                let currentTime = new Date()
                event.time = `${currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}`}:${
                  currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}`
                }`
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

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <div className={styles.pinnedFilesForm}>{this.state.pinnedFiles}</div>
        <input
          type="text"
          name="message"
          placeholder={this.state.placeholder}
          value={this.state.value}
          onChange={this._onChange}
        />
        <img src={microphone} className={styles.addAudio} onClick={this._onAddAudioClick} alt="" />
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
