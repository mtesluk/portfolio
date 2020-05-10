import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import './App.scss';
import { Notification } from '../shared/interfaces/notification.interface';

import { Blog } from './Blog/Blog';
import { Forum } from './Forum/Forum';
import { Dashboard } from './Dashboard/Dashboard';
import { Photos } from './Photos/Photos';
import { Movies } from './Movies/Movies';
import { NotFound } from './Common/NotFound';
import { LoginDialog } from './Login/LoginDialog';
import { notifyError } from '../actions/notify';
import Interceptor from '../shared/interceptors/interceptor';
import { setToken } from '../actions/token';


interface State {
  notify: Notification;
}

interface Props {
  notify: Notification;
  notifyError: (msg: string) => void;
  setToken: (token: string) => void;
}

class App extends React.Component <Props, State> {
  private _interceptor: Interceptor = new Interceptor();
  private _notificationSystem = React.createRef();
  private _notificationStyle = {
    NotificationItem: {
      DefaultStyle: {
        fontSize: '2rem',
      },
    }
  }

  constructor(props: Props) {
    super(props);
    this._interceptor.initInterceptors(props.notifyError);
    props.setToken(localStorage.getItem('token') || '');
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    const notification = this.props.notify;
    if (prevProps.notify !== notification) {
      this.addNotification(notification.msg, notification.type);
    }
  }

  addNotification = (msg: string, level: string) => {
    const notification: any = this._notificationSystem.current;
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
        <NotificationSystem ref={this._notificationSystem} style={this._notificationStyle}/>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    notifyError: (msg: string) => dispatch(notifyError(msg)),
    setToken: (token: string) => dispatch(setToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
