import React from 'react';
import * as d3 from "d3";

export default class VisualGraph extends React.Component {
    constructor(props) {
        super(props);
        this.graph = {
            nodes: [{name: 'aa.com', group: 'domain'},
                {name: '1.1.1.1', group: 'ip'},
                {name: '2.2.2.2', group: 'ip'}],
            links: [{source: 'aa.com', target: '1.1.1.1', value: 1},
                {source: 'aa.com', target: '2.2.2.2', value: 1}]
        }
    }

    componentDidMount() {
        const svg = d3.select(`#${this.props.id}`),
            width = +svg.attr('width'),
            height = +svg.attr('height'),
            simulation = d3.forceSimulation()
                .nodes(this.graph.nodes)
                .force('link', d3.forceLink(this.graph.links).id(d => d.name).distance(50))
                .force('charge', d3.forceManyBody())
                .force('center', d3.forceCenter(width / 2, height / 2))

        const link = svg.append('g')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6)
                .selectAll('line')
                .data(this.graph.links)
                .join('line')
                .attr('stroke-width', d => d.value),

            node = svg.append('g')
                .selectAll('circle')
                .data(this.graph.nodes)
                .join('circle')
                .attr('r', d => this.getNodeStyle(d)['radius'])
                .attr('fill', '#eaecee')
                .attr('stroke', d => this.getNodeStyle(d)['stroke'])
                .attr('stroke-width', d => this.getNodeStyle(d)['strokeWidth'])
                .call(this.drag(simulation)),
            text = svg.append('g')
                .selectAll('text')
                .data(this.graph.nodes)
                .join('text')
                .text(d => d.name);

        simulation.on('tick', () => {
            link.attr('x1', d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node.attr('cx', d => d.x)
                .attr('cy', d => d.y);
            text.attr('x', d => d.x)
                .attr('y', d => d.y)
                .style('font-weight', 500)
        })
    }

    drag(simulation) {
        const dragstarted = (d) => {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            },
            dragged = (d) => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            },
            dragended = (d) => {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            };
        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
    }


    getNodeStyle(node) {
        const strokeStyleMap = {
            domain: {stroke: '#3fa9f5', strokeWidth: 2, radius: 20},
            domainMarker: {stroke: '#2d4256', strokeWidth: 2, radius: 15},
            ip: {stroke: '#eaecee', strokeWidth: 10, radius: 10}
        };
        return strokeStyleMap[node.group]
    }

    render() {
        return <svg id={this.props.id} className="visual-graph" width={1500} height={800}></svg>
    }
}