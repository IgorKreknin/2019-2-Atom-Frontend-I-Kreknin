import React from 'react'
import styles from '../styles/AddButton.module.css'
import button from '../assets/pen.svg'

export class AddButton extends React.Component {
  constructor() {
    super()
    this.state = {
      outerStyle: styles.addButton,
      iframe: <iframe src="api/chat/new/" height="250px" />,
    }

    document.addEventListener('Hide', this._onHide.bind(this))
    document.addEventListener('ShowChats', this._onShowChats.bind(this))
  }

  _onClick() {}

  _onHide() {
    let localState = this.state
    localState.outerStyle = styles.hide
    this.setState(localState)
  }

  _onShowChats() {
    let localState = this.state
    localState.outerStyle = styles.addButton
    this.setState(localState)
  }

  render() {
    return (
      <div>
        <div className={styles.iFrame}>{this.state.iframe}</div>
        <span className={this.state.outerStyle}>
          <img src={button} className={styles.pen} onClick={this._onClick} alt="" />
        </span>
      </div>
    )
  }
}
