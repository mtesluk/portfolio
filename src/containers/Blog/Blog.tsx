import React from 'react';
import './Blog.scss';
import { Link, Switch, Route } from 'react-router-dom';
import { AddForm } from '../../components/Blog/Add';
import { Entry } from '../../components/Blog/Entry';
import { Dashboard } from '../../components/Blog/Dashboard';


export class Blog extends React.Component {
  render() {
    return (
      <div className="blog">
        <div className="blog__nav">
          <div className="blog__nav--left">
            <p className="blog__nav--logo blog__nav--elem"><Link to="/" className="blog__nav--link link">Dashboard</Link></p>
            <p className="blog__nav--elem">Users</p>
            <p className="blog__nav--elem">Sites</p>
          </div>
          <div className="blog__nav--right">
            <Link to="/blog/add" className="blog__nav--link link"><div className="nav-button">Add new entry</div></Link>
          </div>
        </div>
        <div className="blog__container">
          <div className="blog__content">
            <Switch>
                <Route path="/blog" exact component={Dashboard} />
                <Route path="/blog/add" component={AddForm} />
                <Route path="/blog/:id" component={Entry} />
            </Switch>
          </div>
        </div>
    </div>
    )
  }
}