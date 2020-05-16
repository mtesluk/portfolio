import React from 'react';

import './Dashboard.scss';

import HttpService from '../../shared/services/HttpService';
import { Blog } from '../../shared/interfaces/blog';
import { User } from '../../shared/interfaces/user';
import { config } from '../../config';
import { Link } from 'react-router-dom';


interface State {
  latestBlogs: Blog[];
  mostSeenBlogs: Blog[];
  topSeenAuthors: User[];
  mostSeenCountries: string[];
}

interface Props {

}

class Dashboard extends React.Component<Props, State> {
  private _httpService: HttpService = new HttpService();
  state = {
    latestBlogs: [],
    mostSeenBlogs: [],
    topSeenAuthors: [],
    mostSeenCountries: [],
  };

  componentDidMount() {
    this.getMostSeenBlogs();
    this.getLatestBlogs();
    this.getTopSeenAuthors();
    this.getMostSeenCountries();
  }

  getMostSeenBlogs() {
    const url = config.endpoints.blog.base;
    const params = {limit: 5, ordering: '-views'};
    this._httpService.get(url, params).then((response: Blog[]) => {
      this.setState({
        mostSeenBlogs: response,
      })
    }).catch(err => {});
  }

  getLatestBlogs() {
    const url = config.endpoints.blog.base;
    const params = {limit: 5};
    this._httpService.get(url, params).then((response: Blog[]) => {
      this.setState({
        latestBlogs: response,
      })
    }).catch(err => {});
  }

  getTopSeenAuthors() {
    const url = config.endpoints.blog.authors;
    const params = {limit: 5, ordering: '-views'};
    this._httpService.get(url, params).then((response: User[]) => {
      this.setState({
        topSeenAuthors: response,
      })
    }).catch(err => {});
  }

  getMostSeenCountries() {
    const url = config.endpoints.blog.countries;
    const params = {limit: 5, ordering: '-views'};
    this._httpService.get(url, params).then((response: string[]) => {
      this.setState({
        mostSeenCountries: response,
      })
    }).catch(err => {});
  }

  render() {
    return (
      <div className="blog-dashboard">
        <div className="blog-dashboard__table blog-dashboard__most-seen-blogs">
          <header>Most seen blogs</header>
          {this.state.mostSeenBlogs.map((blog: Blog) => {
            return (
              <Link to={config.routes.blog.detail(blog.id)} className="blog-dashboard__list-elem-link" key={blog.id}>
                <div>{blog.title}</div>
              </Link>
            )
          })}
        </div>

        <div className="blog-dashboard__table blog-dashboard__latest-blogs">
          <header>Latest blogs</header>
          {this.state.latestBlogs.map((blog: Blog) => {
            return (
              <Link to={config.routes.blog.detail(blog.id)} className="blog-dashboard__list-elem-link" key={blog.id}>
                <div>{blog.title}</div>
              </Link>
            )
          })}
        </div>

        <div className="blog-dashboard__table blog-dashboard__top-seen-authors">
          <header className="blog-dashboard__header-action">
            <div>Top 5 seen authors</div>
            <div>
              <Link to={{
                pathname: config.routes.blog.authors,
                state: {
                  authors: this.state.topSeenAuthors
                }}}
              >
                Go to
              </Link>
            </div>
          </header>
          {this.state.topSeenAuthors.map((user: User, index: number) => {
            return (
              <div key={index}>{user.username}</div>
            )
          })}
        </div>

        <div className="blog-dashboard__table blog-dashboard__most-seen-countries">
          <header className="blog-dashboard__header-action">
            <div>Most seen countries</div>
            <Link to={{
                pathname: config.routes.blog.sites,
                state: {
                  countries: this.state.mostSeenCountries
                }}}
              >
                Go to
              </Link>
          </header>
          {this.state.mostSeenCountries.map((country: string, index: number) => {
            return (
              <div key={index}>{country}</div>
            )
          })}
        </div>
      </div>
    );
  }
};

export default Dashboard;