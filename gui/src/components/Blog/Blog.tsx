import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './Blog.scss';

import { config } from 'config';
import { BlogSidebar } from './Sidebar';
import { AuthGuard } from 'shared/guards/AuthGuard'
import AddForm  from './add/Add';
import Sites from './cards/Sites';
import Entry from './detail/Entry';
import Authors from './cards/Authors';
import Dashboard from './Dashboard';
import Account from './account/Account';


interface Props {

}

const BlogComponent = (props: Props) => {
  const renderContent = () => {
    return (
      <Switch>
          <Route path={config.routes.blog.dashboard} exact component={Dashboard} />
          <Route path={config.routes.blog.authors} component={Authors} />
          {/* <Route path={config.routes.blog.addNew} component={AddForm} /> */}
          <AuthGuard path={config.routes.blog.addNew} component={AddForm} app="blog" />
          <Route path={config.routes.blog.sites} component={Sites} />
          <Route path={config.routes.blog.profile} component={Account} />
          <Route path={config.routes.blog.detail()} component={Entry} />
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