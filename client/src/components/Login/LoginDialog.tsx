import React, { useState } from 'react';
import { connect } from 'react-redux';

import './LoginDialog.scss';

import { setOpenLoginDialog } from 'actions/login-dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { User, RegisterFormType } from 'shared/interfaces/user';
import { Dialog } from 'shared/components/Dialog';
import { getConfigUrlSrvAuth  } from "config";
import { setUserData } from 'actions/user';
import HttpService from 'shared/services/HttpService';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  setUserData: (data: User) => void;
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
  const _httpService: HttpService = new HttpService();
  const [isRegistration, setRegistration] = useState<number>(RegisterFormType.NONE);

  const getUserData = () => {
    _httpService.get(getConfigUrlSrvAuth('me')).then((response: User) => {
      props.setUserData(response);
    }).catch(err => {});
  }

  const handleClose = (logged: boolean = false) => {
    setRegistration(RegisterFormType.NONE);
    props.setOpenLoginDialog(false);
    if (logged) getUserData();
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
    setUserData: (data: User) => dispatch(setUserData(data)),
  };
};

export const LoginDialog = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
