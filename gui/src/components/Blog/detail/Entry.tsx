import React from 'react';

import './Entry.scss';

import { config  } from '../../../config';
import HttpService from '../../../shared/services/HttpService';
import { Blog, Element } from '../../../shared/interfaces/blog';
import BlogService from '../../../shared/services/blog.service';
import { Link } from 'react-router-dom';
import { User } from '../../../shared/interfaces/user';


interface Props {
  match: any;
};

interface State {
  blog: Blog;
  elements: Element[];
  authors: {main: User, support: User[]}
}


class Entry extends React.Component<Props, State> {
  _httpService: HttpService = new HttpService();
  _service: BlogService = new BlogService();
  state = {
    blog: {id: 0, content: '', user_id: 0, title: "", cooperators: null, photo_names: null, views: 0, country: "Poland", add_date: '', update_date: ''},
    elements: [],
    authors: {main: {username: ''}, support: []},
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getBlog(id);
  }

  getBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    this._httpService.get(url).then((response: Blog) => {
      this.setState({
        blog: response,
        elements: this._service.unformatContent(response.content),
      });
      this.getAuthorsNames();
    });
  }

  getAuthorsNames() {
    const url = config.endpoints.auth.users;
    this._httpService.get(url, {ids: this.state.blog.user_id}).then((response: User[]) => {
      this.setState({
        authors: {...this.state.authors, main: response[0]}
      });
    });

    const cooperators = this.state.blog.cooperators;
    if (cooperators) {
      this._httpService.get(url, {ids: cooperators}).then((response: User[]) => {
        this.setState({
          authors: {...this.state.authors, support: response}
        });
      });
    }
  }

  render() {
    return (
      <div className="blog-detail">
        <div className="blog-detail__description">
          <div className="blog-detail__left">
            <div className="blog-detail__title">{this.state.blog.title}</div>
            <div className="blog-detail__region">
              <Link to={{
                pathname: config.routes.blog.sites,
                state: {
                  countries: [this.state.blog.country]
                }}}
              >
                {this.state.blog.country}
              </Link>
            </div>
            <div className="blog-detail__author">
              <Link to={{
                pathname: config.routes.blog.authors,
                state: {
                  authors: [this.state.authors.main]
                }}}
              >
                {this.state.authors.main.username}
              </Link>
            </div>
            <div className="blog-detail__support">
              {this.state.authors.support.length ? 'Support:' : ''}
              <Link to={{
                pathname: config.routes.blog.authors,
                state: {
                  authors: this.state.authors.support
                }}}
              >
                {this.state.authors.support.map((user: User, index: number) => <span className="blog-detail__support-author" key={index}>{user.username}</span>)}
              </Link>
            </div>
          </div>
          <div className="blog-detail__right">
            <div className="blog-detail__add-date">Created: {this.state.blog.add_date}</div>
            <div className="blog-detail__update-date">Last modify: {this.state.blog.update_date}</div>
            <div className="blog-detail__seen">Views: {this.state.blog.views}</div>
          </div>
        </div>
        <div className="blog-detail__content">
          {this.state.elements.map((elem: Element, id: number) => <div className="blog-detail__p" key={id}>{elem.value}</div>)}
        </div>
      </div>
    );
  }
};

export default Entry;