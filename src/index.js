import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { CustomHeader } from './components/CustomHeader.jsx'
import { ChatsContainer } from './components/ChatsContainer.jsx'
import { AddButton } from './components/AddButton.jsx'
import { MessagesContainer } from './components/MessagesContainer.jsx'
import { UserPage } from './components/UserPage.jsx'
import './styles/globalStyles.css'
import * as serviceWorker from './utils/serviceWorker'

render(
  <Router>
    <div>
      <CustomHeader />
      <Switch>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/chat">
          <MessagesContainer />
        </Route>
        <Route path="/">
          <ChatsContainer />
          <AddButton />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
