import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import { CSSProperties } from '@material-ui/styles';
import './Blog.scss';

import AddForm  from './Add';
import Sites from './Sites';
import { Entry } from './Entry';
import { Users } from './Users';
import { Dashboard } from './Dashboard';
import { setOpenLoginDialog } from '../../actions/login-dialog';
import { User } from '../../interfaces/user';
import { resetToken } from '../../actions/token';
import { notifySuccess } from '../../actions/notify';
import { BlogSidebar } from './Sidebar';


interface Props {

}

const BlogComponent = (props: Props) => {
  const renderContent = () => {
    return (
      <div className="blog__content">
        <Switch>
            <Route path="/blog" exact component={Dashboard} />
            <Route path="/blog/users" component={Users} />
            <Route path="/blog/add" component={AddForm} />
            <Route path="/blog/sites" component={Sites} />
            <Route path="/blog/:id" component={Entry} />
        </Switch>
      </div>
    )
  }

  return (
    <div className="blog">
      <BlogSidebar>
        {renderContent()}
      </BlogSidebar>
    </div>
  )
}

export const Blog = connect(null)(BlogComponent);