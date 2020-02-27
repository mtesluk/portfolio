import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import './App.scss';
import { Notification } from '../interfaces/notification.interface';

import { Blog } from './Blog/Blog';
import { Forum } from './Forum/Forum';
import { Dashboard } from './Dashboard/Dashboard';
import { Photos } from './Photos/Photos';
import { Movies } from './Movies/Movies';
import { NotFound } from './Common/NotFound';
import { LoginDialog } from './Login/LoginDialog';


interface State {
  notify: Notification;
}

interface Props {
  notify: Notification;
}

class App extends React.Component <Props, State> {
  notificationSystem = React.createRef();

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
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
        <LoginDialog />
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
