import React from "react";
import * as d3 from "d3";

import VisualPanel from "./VisualPanel";
import './visual.scss';

export default class Visual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    /** @type {HTMLCanvasElement}  */
    this.container = document.getElementById(this.props.id);
  }

  render() {
    return (
        <div id={this.props.id} className="visual">
          <VisualPanel/>
        </div>
    );
  }
}
