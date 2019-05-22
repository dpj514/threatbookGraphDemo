import React from 'react';
import * as d3 from "d3";

export default class VisualGraph extends React.Component {
    constructor(props) {
        super(props);
        this.graph = {
            nodes: [{
                name: 'aa.com',
                group: 0
            }, {name: '1.1.1.1',
                group: 1}, {name: '2.2.2.2', group: 1}],
            links: [{source: 0, target: 1, value: 1}]
        }
    }

    componentDidMount() {
        const svg = d3.select(`#${this.props.id}`),
            width = +svg.attr('width'),
            height = +svg.attr('height'),
        simulation = d3.forceSimulation()
            .nodes(this.graph.nodes);

        simulation
            .force('charge_force', d3.forceManyBody())
            .force('center_force', d3.forceCenter(width / 2, height / 2));

        const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.graph.nodes)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('fill', 'red');
    }

    render() {
        return <svg id={this.props.id} className="visual-graph" width={600} height={400}> </svg>
    }
}