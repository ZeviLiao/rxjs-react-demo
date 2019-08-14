import React from 'react'
import './App.css'
import * as rxjs from 'rxjs'
import { map, scan, flatMap, debounceTime, switchMap } from 'rxjs/operators'
import { Component } from 'react'
import $ from 'jquery'

function sendRequest() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res =>
    res.json()
  )
}

function searchWikipedia(term) {
  return $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).promise()
}

function renderList(list) {
  $('.auto-complete__list').empty()
  $('.auto-complete__list').append(list.map(item => '<li>' + item + '</li>'))
}

export default class App extends Component {
  componentDidMount() {
    // rxjs
    //   .fromEvent(document.querySelector('input[name=send]'), 'click')
    //   .pipe(flatMap(e => rxjs.from(sendRequest())))
    //   .subscribe(value => {
    //     console.log(value)
    //   })
    rxjs
      .fromEvent(document.querySelector('.auto-complete input'), 'input')
      .pipe(
        debounceTime(250),
        map(e => e.target.value),
        switchMap(value => {
          return value.length < 1
            ? rxjs.of([])
            : rxjs.from(searchWikipedia(value)).pipe(map(res => res[1]))
        })
      )
      .subscribe(value => {
        renderList(value)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="auto-complete">
            <input type="text" name="abc" id="" />
            <ul className="auto-complete__list" />
          </div>
        </header>
      </div>
    )
  }
}
