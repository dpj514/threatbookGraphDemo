import React from "react";

export default class VisualPanel extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            {name: '恶意域名', num: 2},
            {name: '恶意域名', num: 2}
        ];
        this.graph = {
            nodes: [{
                name: 'aa.com',
                group: 0
            }, {name: '1.1.1.1',
            group: 1}, {name: '2.2.2.2', group: 1}],
            links: [{source: 0, target: 1, value: 1}]
        }
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
                        关联信息
                        <hr/>
                        <VisualPanelList>
                            {this.data.map(({name, num}) => <VisualPanelListItem name={name} num={num}/>)}
                        </VisualPanelList>
                    </div>
                </div>
            </div>
        );
    }
}


function VisualPanelList(props) {
    return (
        <ul className="visual-list">
            {[...props.children]}
        </ul>
    )
}

function VisualPanelListItem(props) {
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
