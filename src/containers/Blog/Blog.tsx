import React from 'react';
import './Blog.scss';
import { Link, Switch, Route } from 'react-router-dom';
import AddForm  from './Add';
import { Entry } from '../../components/Blog/Entry';
import { Users } from '../../components/Blog/Users';
import { Dashboard } from '../../components/Blog/Dashboard';
import Sites from '../../components/Blog/Sites';
import DehazeIcon from '@material-ui/icons/Dehaze';


export class Blog extends React.Component {
  render() {
    return (
      <div className="blog">
        <div className="blog__nav">
          <div className="blog__nav-inside">
            <div className="blog__nav--left">
              <p className="blog__nav--logo blog__nav--elem">
                <DehazeIcon />
              </p>
              <p className="blog__nav--logo blog__nav--elem">
                <Link to="/blog" className="blog__nav--link link">
                  Blog
                </Link>
              </p>
              <p className="blog__nav--elem"><Link to="/blog/users" className="blog__nav--link link">Users</Link></p>
              <p className="blog__nav--elem"><Link to="/blog/sites" className="blog__nav--link link">Sites</Link></p>
            </div>
            <div className="blog__nav--right">
              <Link to="/blog/add" className="blog__nav--link link"><div className="nav-button">Add new entry</div></Link>
            </div>
          </div>
        </div>
        <div className="blog__container">
          <div className="blog__content">
            <Switch>
                <Route path="/blog" exact component={Dashboard} />
                <Route path="/blog/users" component={Users} />
                <Route path="/blog/add" component={AddForm} />
                <Route path="/blog/sites" component={Sites} />
                <Route path="/blog/:id" component={Entry} />
            </Switch>
          </div>
        </div>
    </div>
    )
  }
}