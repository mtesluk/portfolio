import React from 'react';

import './select.scss';

import HttpService from '../../../services/HttpService';
import { Entity } from 'shared/interfaces/select';


interface State {
  selected: number | string;
  data: Entity[];
}

interface Props {
  onChange?: (value: number | string) => void;
  data?: Entity[];
  endpoint?: string;
  placeholder?: string;
  changeValue?: boolean;
}

class SelectWidget extends React.Component<Props, State> {
  private _httpService: HttpService = new HttpService();
  state = {
    selected: -1,
    data: [],
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.data !== state.data && !props.endpoint) {
      return {
        data: props.data,
      };
    }

    return null;
  }

  componentDidMount() {
    const url = this.props.endpoint;
    if (url) this.getData(url);
  }


  getData(url: string | null) {
    if (url) {
      this._httpService.get(url).then(response => {
        this.setState({
          data: response || [],
        })
      }).catch(err => {});
    }
  }

  handleSelectChange(event: any) {
    const value: number | string = Number(event.target.value) || event.target.value;
    if (this.props.onChange) this.props.onChange(value);
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <select
        className="widget-select"
        value={this.props.changeValue ? this.state.selected : -1}
        onChange={(e) => this.handleSelectChange(e)}
      >
        <option
          value={-1}
          disabled>{this.props.placeholder || "Pick"}
        </option>
        {this.state.data.map((entity: Entity, index: number) => <option key={entity.id || index} value={entity.id || entity.name}>{entity.name}</option>)}
      </select>
    )
  }
}

export default SelectWidget;