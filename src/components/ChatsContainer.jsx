import React from 'react'
import styles from '../styles/ChatsContainer.module.css'
import { ChatItem } from './ChatItem.jsx'

export class ChatsContainer extends React.Component {
  constructor() {
    super()

    this.fillChats = this.fillChats.bind(this)

    this.state = {
      chats: this.fillChats(),
      outerStyle: styles.container,
    }

    fetch('http://www.localhost/api/chat/sanya2000')
      .then(
        function(result) {
          return result.json()
        }.bind(this),
      )
      .then(
        function(data) {
          let chats = data.chats
          let result = []
          if (chats != null) {
            for (let i = 0; i < chats.length; i++) {
              let chat = {}
              chat.key = 0
              chat.name = chats[i].topic
              result.push(<ChatItem chat={chat} />)
            }
            this.setState({ chats: result, outerStyle: styles.container })
          }
        }.bind(this),
      )

    document.addEventListener('NewChat', this._onNewChat.bind(this))
    document.addEventListener('Hide', this._onHide.bind(this))
    document.addEventListener('ShowChats', this._onShowChats.bind(this))
  }

  fillChats() {
    const incomingChats = JSON.parse(localStorage.getItem('chats'))
    let result = []
    if (incomingChats != null) {
      for (let i = 0; i < incomingChats.length; i += 1) {
        let chat = {}
        chat.key = incomingChats[i].key
        chat.name = incomingChats[i].name
        result.push(<ChatItem chat={chat} />)
      }
    }
    return result
  }

  _onNewChat(event) {
    event.preventDefault()
    const incomingChats = JSON.parse(localStorage.getItem('chats'))
    let chat = {}
    chat.key = incomingChats[incomingChats.length - 1].key
    chat.name = incomingChats[incomingChats.length - 1].name
    const data = JSON.parse(localStorage.getItem(incomingChats[incomingChats.length - 1].key))
    chat.lastMessageTime = data.lastMessageTime
    chat.lastMessage = data.lastMessage

    let chats = this.state.chats
    chats.push(<ChatItem chat={chat} />)
    this.setState({ chats: chats })
    //console.log("add");
  }

  _onHide() {
    let localState = this.state
    localState.outerStyle = styles.hide
    this.setState(localState)
  }

  _onShowChats() {
    let localState = this.state
    localState.outerStyle = styles.container
    this.setState(localState)
  }

  render() {
    return <div className={this.state.outerStyle}>{this.state.chats}</div>
  }
}
