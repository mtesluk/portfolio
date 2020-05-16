import React from 'react';
import { connect } from 'react-redux';
import { notifyError } from '../../actions/notify';
import { User } from '../interfaces/user';
import { Redirect, Route } from 'react-router-dom';


interface State {
  user: User;
}

interface Props {
  children: any;
  user: User;
  app: string;
  notifyError: (msg: string) => void;
}

const Guard = ({ component: Component, user, app, notifyError, ...rest }) => {
  const redirectWrongLogin = () => {
    notifyError('Please sign in to have full access!');
    return <Redirect to={{
      pathname: `/${app}`,
    }} />
  };

  return <Route {...rest} render={(props) => (
    user?.username
    ? <Component {...props} />
    : redirectWrongLogin()
  )} />
}




const mapDispatchToProps = (dispatch: any) => {
  return {
    notifyError: (msg: string) => dispatch(notifyError(msg)),
  };
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
}

export const AuthGuard = connect(mapStateToProps, mapDispatchToProps)(Guard);