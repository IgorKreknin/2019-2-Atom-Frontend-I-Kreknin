import React from 'react'
import { render } from 'react-dom'
import { CustomHeader } from './components/CustomHeader.jsx'
import { ChatsContainer } from './components/ChatsContainer.jsx'
import { AddButton } from './components/AddButton.jsx'
import { MessagesContainer } from './components/MessagesContainer.jsx'
import './styles/globalStyles.css'
import * as serviceWorker from './utils/serviceWorker'

render(
  <div>
    <CustomHeader />
    <ChatsContainer />
    <MessagesContainer />
    <AddButton />
  </div>,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
