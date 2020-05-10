import React, { useState } from 'react';
import { connect } from 'react-redux';

import './LoginDialog.scss';

import { setOpenLoginDialog } from '../../actions/login-dialog';
import { setToken } from '../../actions/token';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { User, RegisterFormType } from '../../shared/interfaces/user';
import { Dialog } from '../../shared/components/Dialog';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  setToken: (token: string) => void;
  isOpenLoginDialog: boolean;
  user: User;
  token: string;
}

interface State {
  isOpenLoginDialog: boolean;
  user: User;
  token: string;
}

const LoginComponent = (props: Props) => {
  const [isRegistration, setRegistration] = useState<number>(RegisterFormType.NONE);

  const handleClose = () => {
    setRegistration(RegisterFormType.NONE);
    props.setOpenLoginDialog(false);
  };

  const renderRegisterForm = () => {
    return (
      <RegisterForm setRegistration={setRegistration} registerType={isRegistration}></RegisterForm>
    )
  }

  const renderLoginForm = () => {
    return (
      <LoginForm handleClose={handleClose} setRegistration={setRegistration}></LoginForm>
    )
  }

  return (
    <Dialog onClose={() => handleClose()} open={props.isOpenLoginDialog} title={isRegistration ? 'Sign up' : 'Login'}>
      {isRegistration ? renderRegisterForm() : renderLoginForm()}
    </Dialog>
  );
};

const mapStateToProps = (state: State) => {
  return {
    isOpenLoginDialog: state.isOpenLoginDialog,
    user: state.user,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open)),
    setToken: (token: string) => dispatch(setToken(token))
  };
};

export const LoginDialog = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
