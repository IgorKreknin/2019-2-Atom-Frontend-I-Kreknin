import React from 'react'
import styles from '../styles/UserPage.module.css'
import camera from '../assets/camera.svg'

export class UserPage extends React.Component {
  constructor() {
    super()
    this.state = {
      mainStyle: styles.hide,
      username: 'Павел',
      login: '@Pavel2000',
      about: 'Pavel is a student',
    }

    this._onChange = this._onChange.bind(this)
    document.addEventListener('ConfirmChanges', this._onConfirmChanges.bind(this))
  }

  _onChange(event) {
    let localState = this.state

    if (event.target.name === 'username') {
      localState.username = event.target.value
    }
    if (event.target.name === 'login') {
      localState.login = event.target.value
    }
    if (event.target.name === 'about') {
      localState.about = event.target.value
    }

    this.setState(localState)

    console.log(event.target)
  }

  _onConfirmChanges() {
    console.log(this.state)
  }

  render() {
    return (
      <div className={styles.userPageContainer}>
        <img src={camera} className={styles.profilePhoto} alt="" />
        <div className={styles.profileAboutLine}>
          <div className={styles.profileAboutLineDataContainer}>
            <div className={styles.profileAboutLineName}>Username</div>
            <input
              className={styles.profileAboutLineData}
              value={this.state.username}
              onChange={this._onChange}
              name="username"
            />
          </div>
          <div className={styles.profileAboutLineTitle}>Title</div>
        </div>
        <div className={styles.profileAboutLine}>
          <div className={styles.profileAboutLineDataContainer}>
            <div className={styles.profileAboutLineName}>Login</div>
            <input
              className={styles.profileAboutLineData}
              value={this.state.login}
              onChange={this._onChange}
              name="login"
            />
          </div>
          <div className={styles.profileAboutLineTitle}>Title</div>
        </div>
        <div className={styles.profileAboutLine}>
          <div className={styles.profileAboutLineDataContainer}>
            <div className={styles.profileAboutLineName}>Bio</div>
            <input
              className={styles.profileAboutLineData}
              value={this.state.about}
              onChange={this._onChange}
              name="about"
            />
          </div>
          <div className={styles.profileAboutLineTitle}>Title</div>
        </div>
      </div>
    )
  }
}
