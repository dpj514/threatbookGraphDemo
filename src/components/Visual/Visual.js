import React from "react";

import VisualPanel from "./VisualPanel";
import VisualGraph from './VisualGraph'
import './visual.scss';

export default class Visual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.container = document.getElementById(this.props.id);
  }

  render() {
    return (
        <div className="visual">
          <VisualPanel/>
          <VisualGraph id={this.props.id} />
        </div>
    );
  }
}
