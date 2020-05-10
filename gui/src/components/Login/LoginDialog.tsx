import React, { useState } from 'react';
import { connect } from 'react-redux';

import './LoginDialog.scss';

import { setOpenLoginDialog } from '../../actions/login-dialog';
import { setToken } from '../../actions/token';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { User } from '../../shared/interfaces/user';
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
  const [isRegister, setRegister] = useState<null | 'partial' | 'full'>(null);

  const handleClose = () => {
    localStorage['token'] = props.token;
    // axios.get('api/v1/users/me/').then(resposne => {
    //   console.log(resposne)
    // }).catch(error => {
    //   console.log(error)
    // })
    setRegister(null);
    console.log(1111111111)
    props.setOpenLoginDialog(false);
  };

  return (
    <Dialog onClose={() => handleClose()} open={props.isOpenLoginDialog} title={isRegister ? 'Sign up' : 'Login'}>
      {isRegister ? <RegisterForm setRegister={setRegister} registerType={isRegister}></RegisterForm> : <LoginForm handleClose={handleClose} setRegister={setRegister}></LoginForm>}
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
