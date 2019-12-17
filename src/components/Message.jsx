import React from 'react'
import styles from '../styles/Message.module.css'

export default class Message extends React.Component {
  constructor(props) {
    super()
    const { message } = props
    this.state = {
      owner: '',
      text: message.text,
      time: message.time,
      attachments: [],
      audio: undefined,
    }

    if (message.pinnedFiles) {
      for (var i = 0; i < message.pinnedFiles.length; i++) {
        this.state.attachments.push(<img src={message.pinnedFiles[i]} className={styles.messageImage} alt="" />)
      }
    }

    if (message.audioURL) {
      this.state.audio = <audio src={message.audioURL} className={styles.messageAudio} controls />
    }
  }

  render() {
    return (
      <div className={styles.message}>
        <div className={styles.messageText}>{this.state.text}</div>
        <div className={styles.messageImagesContainer}>{this.state.attachments}</div>
        <div>{this.state.audio}</div>
        <div className={styles.messageTime}>{this.state.time}</div>
      </div>
    )
  }
}
