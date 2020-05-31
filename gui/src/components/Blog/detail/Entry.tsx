import React from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import './Entry.scss';
import ButtonWidget from 'shared/components/widgets/button/button';

import { config  } from 'config';
import { Blog, Element, ElementType } from 'shared/interfaces/blog';
import { Link } from 'react-router-dom';
import { User } from 'shared/interfaces/user';
import { notifySuccess } from 'actions/notify';
import BlogService from 'shared/services/blog.service';
import UserService from 'shared/services/user.service';


interface Props {
  match: any;
  history: any;
  notifySuccess: (msg: string) => void;
};

interface State {
  blog: Blog;
  elements: Element[];
  authors: {main: User, support: User[]}
}


class Entry extends React.Component<Props, State> {
  _service: BlogService = new BlogService();
  _userService: UserService = new UserService();
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
    this._service.getBlog(id).then((response: Blog) => {
      if (response) {
        this.setState({
          blog: response,
          elements: this._service.unformatContent(response.content, response.photo_names),
        });
        this.getAuthorsNames();
      }
    }).catch(err => {});
  }

  getAuthorsNames() {
    this._userService.getUsers(this.state.blog.user_id).then((response: User[]) => {
      this.setState({
        authors: {...this.state.authors, main: response[0]}
      });
    });

    const cooperators = this.state.blog.cooperators;
    if (cooperators) {
      this._userService.getUsers(cooperators).then((response: User[]) => {
        this.setState({
          authors: {...this.state.authors, support: response}
        });
      });
    }
  }

  removeBlog(id: number) {
    this._service.removeBlog(id).then(response => {
      this.props.notifySuccess('Blog successfully removed...');
      this.props.history.push('/blog');
    }).catch(err => err);
  }

  render() {
    return (
      <div className="blog-detail">
        <div className="blog-detail__description">
          <div className="blog-detail__left">
            <div className="blog-detail__title">{this.state.blog.title}</div>
            <div className="blog-detail__region">
              Region:	{'\u00A0'}
                {this.state.blog.country.split(';').map((country, index) => {
                  return <span className="blog-detail__region-element" key={index}>
                          <Link to={{
                            pathname: config.routes.blog.sites,
                            state: {
                              countries: [country]
                            }}}
                          >
                            {country}
                          </Link>
                        </span>
                })}
            </div>
            <div className="blog-detail__author">
              Author:	{'\u00A0'}
              <Link to={{
                pathname: config.routes.blog.authors,
                state: {
                  authors: [this.state.authors.main]
                }}}
              >
                {this.state.authors.main ? this.state.authors.main.username : 'Anonym'}
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
            <div className="blog-detail__update-date">Last modified: {this.state.blog.update_date}</div>
            <div className="blog-detail__seen">Views: {this.state.blog.views}</div>
            <div className="blog-detail__actions">
                <ButtonWidget text="Remove" onClick={(e) => this.removeBlog(this.state.blog.id)}/>
            </div>
          </div>
        </div>
        <div className="blog-detail__content">
          {this.state.elements.map((elem: Element, id: number) => {
            return elem.type === ElementType.PARAGRAPH ? <div className="blog-detail__p" key={id}>{elem.value}</div> : <img key={id} src={elem.value as string} alt={elem.value as string} className="blog-detail__image" />
          })}
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Entry));
