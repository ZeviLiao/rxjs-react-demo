import React from 'react'
import './App.css'
import * as rxjs from 'rxjs'
import { map, scan } from 'rxjs/operators'
// import { fromEvent } from 'rxjs';

// rxjs.of(1, 2, 3).subscribe(n => {
//   console.log(n)
// })

// rxjs.fromEvent(window, 'click').subscribe(e => {
//   console.log('click~')
// })

// rxjs
//   .fromEvent(window, 'click')
//   .pipe(map(e => e.target))
//   .subscribe(value => {
//     console.log('click: ', value)
//   })

rxjs
  .fromEvent(window, 'click')
  .pipe(
    map(e => 1),
    scan((total, now) => total + now)
  )
  .subscribe(value => {
    document.querySelector('#counter').innerText = value
  })

function App() {
  return (
    <div className="App">
      <header className="App-header">
        click count:
        <div id="counter">hello</div>
      </header>
    </div>
  )
}

export default App
