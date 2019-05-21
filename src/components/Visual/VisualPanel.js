import React from "react";

export default class VisualPanel extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
        {name: '恶意域名', num: 2},
        {name: '恶意域名', num: 2}
    ]
  }
  render() {
    return (
      <div className="visual-panel">
        <div className="visual-panel__header">
            <a className="visual-panel__title">baidu.com</a>
        </div>
          <hr/>
        <div className="visual-panel__body">
            <div className="visual-panel__content">

            </div>
            <VisualPanelList>
                {this.data.map(({name, num}) => <VisualPanelListItem name={name} num={num} />)}
            </VisualPanelList>
        </div>
      </div>
    );
  }
}


function VisualPanelList(props){
    return (
        <div className="visual-list">
            <ul>
            {[...props.children]}
            </ul>
        </div>
    )
}

function VisualPanelListItem(props){
    return (
        <li className="visual-list__item" key={props.key}>
            <div>
                {props.name}
            </div>
            <div>
                {props.num}
            </div>
        </li>
    )
}
