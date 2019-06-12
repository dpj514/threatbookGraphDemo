import React from "react";

import VisualPanel from "./VisualPanel";
import VisualGraph from './VisualGraph'
import './visual.scss';

export default class Visual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: this.props.domain,
      type: 'root'
    };
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentDidMount() {
    this.container = document.getElementById(this.props.id);
  }

  setData() {

  }

  handleNodeClick({name, type}) {
    this.setState({name, type})
  }

  render() {
    return (
        <div className="visual">
          <VisualPanel name={this.state.name} type={this.state.type}/>
          <VisualGraph id={this.props.id} onNodeClick={this.handleNodeClick} domain={this.props.domain} />
        </div>
    );
  }
}
