import React from "react";

import VisualIcon from './VisualIcon';

export default class VisualPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: '域名IP', num: 2},
                {name: '链出域名', num: 2}
            ]
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return ! (nextState.name === this.state.name && nextState.type === this.state.type)
    //
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.name === this.props.name && prevProps.type === this.props.type) {
            return;
        }
        this.showInfo(this.props.name, this.props.type)
    }

    showInfo(name, type) {
        switch (type) {
            case 'root':
                this.setState({
                    data: [{name: '域名IP', num: 4},
                        {name: '链出域名', num: 4}]
                });
                break;
            case 'ipMark':
                this.setState({
                    data: [{name: '1.1.1.1'}]
                });
                break;
            case 'ip':
                this.setState({
                    data: [{name: '开放端口', num: 2}]
                })
        }
    }

    render() {
        return (
            <div className="visual-panel">
                <VisualPanelHeader name={this.props.name} type={this.props.type}/>
                <hr/>
                    <VisualPanelBody type={this.props.type} data={this.state.data}/>
            </div>
        );
    }
}

class VisualPanelHeader extends React.Component {

    render() {
        return (
            <div className="visual-panel__header">
                <VisualIcon size="large" type={this.props.type} />
                <a className="visual-panel__title">{this.props.name}</a>
            </div>
        )
    }
}

class VisualPanelBody extends React.Component {
    render() {
        let title;
        if (this.props.type === 'root') {
            title = <div><VisualIcon size="small" type="label" /> 关联信息</div>;
        }
        else if (this.props.type === 'ipMark') {
            title = null;
        }
        return (
            <div className="visual-panel__body">
                <div className="visual-panel__message">

                </div>
            <div className="visual-panel__content">
                {title ? (<div>
                        {title}
                        <hr/>
                    </div>)
                    : null
                }

                <VisualPanelList dataSource={this.props.data} />
            </div>
            </div>
        )
    }
}

function VisualPanelList(props) {
    return (
        <ul className="visual-list">
            {props.dataSource.map(({name, num}) => <VisualPanelListItem name={name} num={num}/>)}
        </ul>
    )
}

function VisualPanelListItem(props) {
    let iconTypeMap = {
        root: 'domain',
        '域名IP': 'ip',
        '开放端口': 'port',
        '链出域名': 'domain'
    },
    type = iconTypeMap[props.name];

    return (
        <li className="visual-list__item" key={props.key}>
            <div>
                <VisualIcon size="small" type={type} /> {props.name}
            </div>
            {props.num ? <div>{props.num}</div> : null}
        </li>
    )
}
