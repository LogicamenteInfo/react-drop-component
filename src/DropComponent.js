import React from "react";
import PropTypes from "prop-types";
import { OpenFile, ReadFile } from "./File";

const dropComponents = [];

const handledEvents = {
  drag: "onDrag",
  dragstart: "onDragStart",
  dragend: "onDragEnd",
  dragover: "onDragOver",
  dragenter: "onDragEnter",
  dragleave: "onDragLeave",
  drop: "onDrop"
};

Object.keys(handledEvents).forEach(event => {
  document.addEventListener(event, ev => {
    dropComponents.forEach(component => component[handledEvents[event]](ev, true));
  });
});

export default class DropComponent extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      overDocument: false,
      over: false
    };
  }

  setDragOver(value, document) {
    if (value === false && document) {
      this.timeout = setTimeout(
        () => this.setState({ overDocument: false }),
        75
      );
    } else if (value === true && document) {
      this.timeout = clearTimeout(this.timeout);
      this.setState({ overDocument: true });
    } else {
      this.setState({ over: value });
    }
  }

  triggerOnDrop(files) {
    Array.from(files).map(file => {
      if (this.props.dontRead === true) {
        this.props.onDrop(file, undefined);
        return;
      }
      ReadFile(file)
        .catch(err => Promise.resolve(undefined))
        .then(text => this.props.onDrop(file, text));
    });
  }

  componentDidMount() {
    dropComponents.push(this);
  }

  componentWillUnmount() {
    dropComponents.push(this);
  }

  onClick(event) {
    OpenFile({
      multiple: this.props.multiple,
      accept: this.props.accept
    }).then(files => this.triggerOnDrop(files));
  }

  onDrag(event, document) {
    if (document) return;
    event.preventDefault();
  }

  onDragStart(event, document) {
    if (document) return;
    event.preventDefault();
  }

  onDragOver(event, document) {
    event.preventDefault();
    this.setDragOver(true, document);
  }

  onDragEnter(event, document) {
    event.preventDefault();
    this.setDragOver(true, document);
  }

  onDragEnd(event, document) {
    event.preventDefault();
    this.setDragOver(false, document);
  }

  onDragLeave(event, document) {
    event.preventDefault();
    this.setDragOver(false, document);
  }

  onDrop(event, document) {
    event.preventDefault();
    this.setDragOver(false, document);
    if (document) return;
    const files = event.dataTransfer.items
      ? Array.from(event.dataTransfer.items).map(f => f.getAsFile())
      : event.dataTransfer.files
        ? event.dataTransfer.files
        : undefined;    
    if (files) this.triggerOnDrop(files);
  }

  render() {
    const handleClick = this.props.handleClick === true;
    const children = (
      <div className={`DropComponent ${this.state.over ? 'DropComponent-Dragging-Over' : ''} ${this.state.overDocument ? 'DropComponent-Dragging-Over-Document' : ''}`} role="button">
        {this.props.label}
      </div>
    );
    const props = {
      onDrag: this.onDrag,
      onDragStart: this.onDragStart,
      onDragEnd: this.onDragEnd,
      onDragOver: this.onDragOver,
      onDragEnter: this.onDragEnter,
      onDragLeave: this.onDragLeave,
      onDrop: this.onDrop
    };
    if (handleClick) props.onClick = this.onClick;
    return React.cloneElement(children, props);
  }
}

DropComponent.propTypes = {
  onDrop: PropTypes.func.isRequired,
  handleClick: PropTypes.bool,
  dontRead: PropTypes.bool,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string
};

DropComponent.defaultProps = {
  handleClick: true,
  dontRead: false,
  multiple: false,
  accept: '*',
  label: 'Select or Drop your file here'
};