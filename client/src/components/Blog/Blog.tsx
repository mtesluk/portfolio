import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './Blog.scss';

import { getConfigRoutesBlog } from 'config';
import { BlogSidebar } from './Sidebar';
import { AuthGuard } from 'shared/guards/AuthGuard'
import AddForm  from './add/Add';
import Sites from './cards/Sites';
import Entry from './detail/Entry';
import Authors from './cards/Authors';
import Dashboard from './Dashboard';
import Account from './account/Account';
import Update from './update/Update';


interface Props {

}

const BlogComponent = (props: Props) => {
  const renderContent = () => {
    return (
      <Switch>
          <Route path={getConfigRoutesBlog('dashboard')} exact component={Dashboard} />
          <Route path={getConfigRoutesBlog('authors')} component={Authors} />
          <AuthGuard path={getConfigRoutesBlog('addNew')} component={AddForm} app="blog" />
          <Route path={getConfigRoutesBlog('updateBlog')()} component={Update} />
          <Route path={getConfigRoutesBlog('sites')} component={Sites} />
          <Route path={getConfigRoutesBlog('profile')} component={Account} />
          <Route path={getConfigRoutesBlog('detail')()} component={Entry} />
      </Switch>
    )
  }

  return (
    <BlogSidebar>
      {renderContent()}
    </BlogSidebar>
  )
}

export const Blog = connect(null)(BlogComponent);