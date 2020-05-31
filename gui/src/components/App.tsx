import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import './App.scss';

import { Notification } from 'shared/interfaces/notification.interface';
import { Blog } from './Blog/Blog';
import { Forum } from './Forum/Forum';
import { Dashboard } from './Dashboard/Dashboard';
import { Photos } from './Photos/Photos';
import { Movies } from './Movies/Movies';
import { NotFound } from 'shared/components/NotFound';
import { LoginDialog } from './Login/LoginDialog';
import { notifyError } from 'actions/notify';
import { setToken } from 'actions/token';
import { setUserData } from 'actions/user';
import { User } from 'shared/interfaces/user';
import { config } from 'config';
import HttpService from 'shared/services/HttpService';
import Interceptor from 'shared/interceptors/interceptor';


interface State {
  notify: Notification;
}

interface Props {
  notify: Notification;
  notifyError: (msg: string) => void;
  setToken: (token: string) => void;
  setUserData: (data: User) => void;
}

class App extends React.Component <Props, State> {
  private _httpService: HttpService = new HttpService();
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
    const refreshToken = localStorage.getItem(config.refreshTokenKey) || '';
    this._interceptor.initInterceptors(props.notifyError, props.setToken, refreshToken);
    const token = localStorage.getItem(config.tokenKey);
    props.setToken(token || '');
    if (token) this.getUserData();
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    const notification = this.props.notify;
    if (prevProps.notify !== notification) {
      this.addNotification(notification.msg, notification.type);
    }
  }

  getUserData() {
    this._httpService.get(config.endpoints.auth.me).then((response: User) => {
      this.props.setUserData(response);
    }).catch(err => {});
  }

  addNotification = (msg: string, level: string) => {
    const notification: any = this._notificationSystem.current;
    notification.addNotification({
      message: msg,
      level: level
    });
  };

  renderRouter() {
    return (
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
    );
  }

  render() {
    return (
      <>
        {this.renderRouter()}
        <NotificationSystem ref={this._notificationSystem} style={this._notificationStyle}/>
        <LoginDialog />
      </>
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
    setUserData: (data: User) => dispatch(setUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
