import React from 'react';
import * as d3 from "d3";
import PropTypes from 'prop-types';

import IPIcon from '../../asset/img/ip.svg';
import EarthIcon from '../../asset/img/earth.svg';
import DomainIcon from '../../asset/img/domain.svg'

export default class VisualGraph extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onNodeClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.data = {
            root: 'aa.com',
            ip: [
                {ip: '1.1.1.1', regName: 'a', phone: '1111111111', email: 'a@11.com'},
                {ip: '2.2.2.2', regName: 'a', phone: '1111111111', email: 'a@11.com'}
            ]
        };
        this.graph = {
            nodes: [{name: 'aa.com', type: 'root'},
                {name: 'ipMark', type: 'ipMark'},
                {name: '1.1.1.1', type: 'ip'},
                {name: '2.2.2.2', type: 'ip'}],
            links: [{source: 'aa.com', target: 'ipMark', value: 2},
                {source: 'ipMark', target: '1.1.1.1', value: 1},
                {source: 'ipMark', target: '2.2.2.2', value: 1}]
        }
    }

    componentDidMount() {
        const svg = d3.select(`#${this.props.id}`),
            width = +svg.attr('width'),
            height = +svg.attr('height'),
            simulation = d3.forceSimulation()
                .nodes(this.graph.nodes)
                .force('link', d3.forceLink(this.graph.links).id(d => d.name).distance(100))
                .force('charge', d3.forceManyBody())
                .force('center', d3.forceCenter(width / 2, height / 2));

        const link = svg.append('g')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6)
                .selectAll('line')
                .data(this.graph.links)
                .join('line')
                .attr('stroke-width', d => d.value),

            node = svg.append('g')
                .selectAll('g')
                .data(this.graph.nodes)
                .join('g')
                .attr('class', 'visual-graph__node')
                .on('click', this.props.onNodeClick)
                .call(this.drag(simulation));

        node.append('circle')
            .attr('r', d => this.getNodeStyle(d)['radius'])
            .attr('fill', '#eaecee')
            .attr('stroke', d => this.getNodeStyle(d)['stroke'])
            .attr('stroke-width', d => this.getNodeStyle(d)['strokeWidth']);

        node.append('image')
            .attr('xlink:href', d => this.getNodeStyle(d)['icon'])
            .attr('width', 30)
            .attr('height', 30)
            .attr('x', d => -this.getNodeStyle(d)['radius'] * 0.6)
            .attr('y', d => -this.getNodeStyle(d)['radius'] * 0.6)
            .attr('height', d => this.getNodeStyle(d)['radius'] * 2 * 0.6)
            .attr('width', d => this.getNodeStyle(d)['radius'] * 2 * 0.6);

        node.append('text')
            .data(this.graph.nodes)
            .join('text')
            .text(d => d.name)
            .style('user-select', 'none')
            .style('font-weight', 500);

        simulation.on('tick', () => {
            link.attr('x1', d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            // circle.attr('cx', d => d.x)
            //     .attr('cy', d => d.y);
            // text.attr('x', d => d.x)
            //     .attr('y', d => d.y);
            // icon.attr('x', d => d.x)
            //     .attr('y', d => d.y)
            node.attr('transform', d => `translate(${d.x},${d.y})`)
        })
        console.log(this.graph.nodes)
    }

    getGraph(data) {
        const nodes = [],
            links = [];
        nodes.push({name: data.root, type: 'root'})
        return {nodes, links}
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
        const nodeStyleMap = {
            root: {stroke: '#3fa9f5', strokeWidth: 2, radius: 20, icon: DomainIcon},
            ipMark: {stroke: '#2d4256', strokeWidth: 2, radius: 15, icon: IPIcon},
            ip: {stroke: '#eaecee', strokeWidth: 0, radius: 15, icon: EarthIcon}
        };
        return nodeStyleMap[node.type]
    }

    render() {
        return <svg id={this.props.id} className="visual-graph" width={1500} height={800}></svg>
    }
}