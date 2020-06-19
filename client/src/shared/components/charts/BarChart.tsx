import React from 'react';

import './BarChart.scss';

import * as d3 from 'd3';
import { manageColors } from './utils';
import { PropsBasic, RangeConfig, DataBasic } from './interfaces';


interface State {

}

interface Props extends PropsBasic {
  colors: RangeConfig | string;
}

class BarChart extends React.Component<Props, State> {

  componentDidMount() {
    const width: number = this.props.width;
    const height: number = 4/5 * width;
    const data: DataBasic[] = this.props.data;
    this._prepareChart(height, width, data, this.props.colors);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.data !== prevProps.data) {
      const width: number = this.props.width;
      const height: number = 4/5 * width;
      const data: DataBasic[] = this.props.data;
      this._prepareChart(height, width, data, this.props.colors);
    }
  }

  _prepareChart(height: number, width: number, data: DataBasic[], colors: RangeConfig | string) {
    const margin = ({top: 30, right: 0, bottom: 30, left: 40});
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => (d.value as any))]).nice()
      .range([height - margin.bottom, margin.top])

    const x = d3.scaleBand()
      .domain(d3.range(data.length) as any)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call(g => g.select('.domain').remove());

    const svg = d3.select(`.${this.props.classSvgName}`)
      .attr('viewBox', [0, 0, width, height] as any);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', d => manageColors(d.value, colors))
      .attr('x', (d, i) => (x(i as any) as any))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .on('mouseover', d => {
        this.props.setPickedData(d.name);
      });

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
  }

  render() {
    return (
      <svg className={this.props.classSvgName}></svg>
    )
  }
}

export default BarChart;