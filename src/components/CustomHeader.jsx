import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import styles from '../styles/Header.module.css'
import burger from '../assets/burger.svg'
import back from '../assets/back.svg'
import photo from '../assets/photo.svg'
import search from '../assets/search.svg'
import menu from '../assets/menu.svg'
import confirm from '../assets/confirm.svg'

export class CustomHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }

    document.addEventListener('ChatSelected', this._onChatSelected.bind(this))
  }

  _onChatSelected(event) {
    event.preventDefault()
    let localState = this.state
    localState.name = event.about.name
    this.setState(localState)
  }

  render() {
    if (localStorage.getItem(window.location.search.replace('?', '')) != null) {
      this.state = { name: JSON.parse(localStorage.getItem(window.location.search.replace('?', ''))).name }
    }

    return (
      <div className={styles.header}>
        <Switch>
          <Route path="/user">
            <Link to="/" className={styles.back}>
              <img src={back} className={styles.icon} alt="" />
            </Link>
            <div className={styles.title}>
              <div className={styles.name}>Edit profile</div>
            </div>
            <div
              className={styles.confirm}
              onClick={function() {
                document.dispatchEvent(new Event('ConfirmChanges'))
              }}
            >
              <img src={confirm} className={styles.icon} alt="" />
            </div>
          </Route>
          <Route path="/chat">
            <Link to="/" className={styles.back}>
              <img src={back} className={styles.icon} alt="" />
            </Link>
            <div className={styles.title}>
              <img src={photo} className={styles.photo} alt="" />
              <div className={styles.name}>{this.state.name}</div>
            </div>
            <div className={styles.menu}>
              <img src={menu} className={styles.icon} alt="" />
            </div>
          </Route>
          <Route path="/">
            <Link to="/user" className={styles.burger}>
              <img src={burger} className={styles.icon} alt="" />
            </Link>
            <div className={styles.title}>
              <div className={styles.name}>Messager</div>
            </div>
            <div className={styles.search}>
              <img src={search} className={styles.icon} alt="" />
            </div>
          </Route>
        </Switch>
      </div>
    )
  }
}
