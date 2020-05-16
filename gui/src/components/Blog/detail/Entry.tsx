import React from 'react';

import './Entry.scss';

import { config  } from '../../../config';
import HttpService from '../../../shared/services/HttpService';
import { Blog } from '../../../shared/interfaces/blog';


interface Props {
  match: any;
};

interface State {
  blog: Blog;
}


class Entry extends React.Component<Props, State> {
  _httpService: HttpService = new HttpService();
  state = {
    blog: {id: 0, content: '', user_id: 0, title: "", cooperators: null, photo_names: null, views: 0, country: "Poland"},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getBlog(id);
  }

  getBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    this._httpService.get(url).then((response: Blog) => {
      this.setState({
        ...this.state,
        blog: response,
      })
    })
  }

  render() {
    return (
      <div className="entry">
        {this.state.blog.content}
      </div>
    );
  }
};

export default Entry;