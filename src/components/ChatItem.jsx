import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/ChatItem.module.css'
import photo from '../assets/photo.svg'
import rad from '../assets/rad.svg'

export class ChatItem extends React.Component {
  constructor(props) {
    super()
    const { chat } = props
    this.state = {
      name: chat.name,
      lastMessage: '',
      lastMessageTime: '',
      key: chat.key,
    }

    this.fillState = this.fillState.bind(this)
    this.fillState()

    this._onClick = this._onClick.bind(this)

    document.addEventListener('ShowChats', this.fillState)
  }

  fillState() {
    let data = JSON.parse(localStorage.getItem(this.state.key))
    let localState = this.state
    localState.lastMessage = data.lastMessage
    localState.lastMessageTime = data.lastMessageTime
    this.setState(localState)
  }

  _onClick() {
    let event = new Event('ChatSelected')
    event.about = this.state
    document.dispatchEvent(event)
  }

  render() {
    return (
      <Link to={{ pathname: '/chat', search: this.state.key }} className={styles.chatPattern}>
        <img src={photo} className={styles.photo} alt="" />
        <div className={styles.chatInfo} onClick={this._onClick}>
          <div className={styles.description}>
            <div className={styles.name}>{this.state.name}</div>
            <div className={styles.time}>{this.state.lastMessageTime}</div>
          </div>
          <div className={styles.message}>
            <div className={styles.lastMessage}>{this.state.lastMessage}</div>
            <img src={rad} className={styles.messageStatus} alt="" />
            <div className={styles.incomingMessages}></div>
          </div>
        </div>
      </Link>
    )
  }
}
