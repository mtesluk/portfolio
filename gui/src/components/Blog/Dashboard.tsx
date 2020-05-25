import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.scss';
import { Card, CardContent, CardActions } from '@material-ui/core';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import { config } from 'config';
import { Blog } from 'shared/interfaces/blog';
import { User } from 'shared/interfaces/user';
import HttpService from 'shared/services/HttpService';
import BlogService from 'shared/services/blog.service';


interface ComponentState {
  latestBlogs: Blog[];
  mostSeenBlogs: Blog[];
  topSeenAuthors: User[];
  mostSeenCountries: string[];
}

interface Props {

}

class Dashboard extends React.Component<Props, ComponentState> {
  private _httpService: HttpService = new HttpService();
  private _service: BlogService = new BlogService();
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
    const params = {limit: 5, ordering: '-views'};
    this._service.getActivatedBlogs(params).then((response: Blog[]) => {
      this.setState({
        mostSeenBlogs: response,
      })
    }).catch(err => {});
  }

  getLatestBlogs() {
    const params = {limit: 5};
    this._service.getActivatedBlogs(params).then((response: Blog[]) => {
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
        <Card className="blog-dashboard__card">
          <CardContent>
            <header className="blog-dashboard__header">Most seen blogs</header>
            {this.state.mostSeenBlogs.map((blog: Blog) => {
              return (
                <Link to={config.routes.blog.detail(blog.id)} className="blog-dashboard__list-elem-link" key={blog.id}>
                  <ViewHeadlineIcon fontSize="inherit" />
                  <div className="blog-dashboard__list-element-text">{blog.title}</div>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card className="blog-dashboard__card">
          <CardContent>
            <header className="blog-dashboard__header">Latest blogs</header>
            {this.state.latestBlogs.map((blog: Blog) => {
              return (
                <Link to={config.routes.blog.detail(blog.id)} className="blog-dashboard__list-elem-link" key={blog.id}>
                  <ViewHeadlineIcon fontSize="inherit" />
                  <div className="blog-dashboard__list-element-text">{blog.title}</div>
                </Link>
              )
            })}
          </CardContent>
        </Card>


        <Card className="blog-dashboard__card">
          <CardContent>
            <header className="blog-dashboard__header">Top 5 seen authors</header>
            {this.state.topSeenAuthors.map((user: User, index: number) => {
              return (
                <div key={index}>{user.username}</div>
              )
            })}
          </CardContent>
          <CardActions>
            <Link to={{
                pathname: config.routes.blog.authors,
                state: {
                  authors: this.state.topSeenAuthors
                }}}
              >
                Visit
              </Link>
          </CardActions>
        </Card>

        <Card className="blog-dashboard__card">
          <CardContent>
            <header className="blog-dashboard__header">Most seen countries</header>
            {this.state.mostSeenCountries.map((country: string, index: number) => {
              return (
                <div key={index}>{country}</div>
              )
            })}
          </CardContent>
          <CardActions>
            <Link to={{
                pathname: config.routes.blog.sites,
                state: {
                  countries: this.state.mostSeenCountries
                }}}
              >
                Visit
              </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
};

export default Dashboard;