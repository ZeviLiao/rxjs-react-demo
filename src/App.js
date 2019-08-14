import React from 'react'
import './App.css'
import * as rxjs from 'rxjs'
import { map, scan, flatMap } from 'rxjs/operators'
import { Component } from 'react'

function sendRequest() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res =>
    res.json()
  )
}

export default class App extends Component {
  componentDidMount() {
    rxjs
      .fromEvent(document.querySelector('input[name=send]'), 'click')
      .pipe(flatMap(e => rxjs.from(sendRequest())))
      .subscribe(value => {
        console.log(value)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="button" name="send" value="send" />
        </header>
      </div>
    )
  }
}
