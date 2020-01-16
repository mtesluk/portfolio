import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { Blog } from './Blog/Blog';
import { Forum } from './Forum/Forum';
import { Dashboard } from './Dashboard';
import { Photos } from '../components/Photos';
import { Movies } from '../components/Movies';


class App extends React.Component {
  render() {

    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/blog" component={Blog} />
            <Route path="/photos" component={Photos} />
            <Route path="/forum" component={Forum} />
            <Route path="/movies" component={Movies} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
