import React from 'react'
import styles from '../styles/MessagesContainer.module.css'
import Message from './Message.jsx'
import FormInput from './FormInput.jsx'

export class MessagesContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      about: {
        key: window.location.search.replace('?', ''),
      },
    }

    document.addEventListener('MessageSent', this._onMessageSent.bind(this))
  }

  componentDidMount() {
    let trueMessages = []
    let rowMessages = JSON.parse(localStorage.getItem(this.state.about.key)).messages

    for (let i = 0; i < rowMessages.length; i++) {
      trueMessages.push(<Message message={{ text: rowMessages[i].text, time: rowMessages[i].time }} />)
    }

    let localState = this.state
    localState.messages = trueMessages
    this.setState(localState)
  }

  _onMessageSent(event) {
    event.preventDefault()
    //console.log(event);

    let data = JSON.parse(localStorage.getItem(this.state.about.key))
    data.messages.push({ text: event.text, time: event.time, name: 'User' })
    data.lastMessage = event.text
    data.lastMessageTime = event.time
    localStorage.setItem(this.state.about.key, JSON.stringify(data))

    let localState = this.state
    localState.messages.push(<Message message={{ text: event.text, time: event.time }} />)
    this.setState(localState)
  }

  render() {
    return (
      <div className={styles.show}>
        <div className={styles.result}>{this.state.messages}</div>
        <FormInput />
      </div>
    )
  }
}
