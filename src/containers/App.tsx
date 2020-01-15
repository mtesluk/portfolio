import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { Blog } from './Blog';
import { Forum } from './Forum';
import { Dashboard } from './Dashboard';
import { Photos } from '../components/Photos';
import { Movies } from '../components/Movies';


class App extends React.Component {
  render() {

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/blog" component={Blog} />
          <Route path="/photos" component={Photos} />
          <Route path="/forum" component={Forum} />
          <Route path="/movies" component={Movies} />
        </Switch>
      </Router>
    );
  }
}

export default App;
