import React, { Component } from "react";
import { render } from "react-dom";

import DropComponent from "../../src";
import './style.css';

class Demo extends Component {
  render() {
    return (
      <div>
        <DropComponent onDrop={(file, text) => console.log(file, text)} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
