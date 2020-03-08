import React from 'react'
import { render } from 'react-dom'
import DropComponent from '../src/DropComponent'
import '../src/style.css'
import './style.css'

class App extends React.Component {

  render() {
    return (
      <div>
        <DropComponent onDrop={(file, text) => console.log(file, text)} />        
      </div>
    )
  }
}

render(
  <App />,
  document.querySelector('#root')
)