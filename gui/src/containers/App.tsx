import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from "react-redux";

import { Blog } from './Blog/Blog';
import { Forum } from './Forum/Forum';
import { Dashboard } from './Dashboard/Dashboard';
import { Photos } from '../components/Photos';
import { Movies } from '../components/Movies';
import { NotFound } from '../components/NotFound';
import NotificationSystem from 'react-notification-system';
import {LoginDialog} from '../components/LoginDialog';

interface Notify {
  type: string;
  msg: string;
}

interface State {
  notify: Notify;
}

interface Prop {
  notify: Notify;
}

class App extends React.Component <Prop, State> {
  notificationSystem = React.createRef();

  componentDidUpdate(prevProps, prevState, snapshot) {
    const notification = this.props.notify;
    if (prevProps.notify !== notification) {
      this.addNotification(notification.msg, notification.type);
    }
  }

  addNotification = (msg: string, level: string) => {
    const notification: any = this.notificationSystem.current;
    notification.addNotification({
      message: msg,
      level: level
    });
  };

  handleClose(value) {
    // setOpen(false);
    // setSelectedValue(value);
  };

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
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
        <NotificationSystem ref={this.notificationSystem} />
        {/* <LoginDialog selectedValue={null} open={open} onClose={this.handleClose} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
      notify: state.notify,
  };
};

export default connect(mapStateToProps)(App);
