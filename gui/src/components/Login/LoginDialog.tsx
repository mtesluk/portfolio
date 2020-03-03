import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './LoginDialog.scss';

import { setOpenLoginDialog } from '../../actions/login-dialog';
import { setToken } from '../../actions/user';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import axios from 'axios';
import { User } from '../../interfaces/user';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  setToken: (token: string) => void;
  isOpenLoginDialog: boolean;
  user: User;
}

interface State {
  isOpenLoginDialog: boolean;
  user: User;
}

const LoginComponent = (props: Props) => {
  const [isRegister, setRegister] = useState<null | 'partial' | 'full'>(null);

  const handleClose = (back?: boolean) => {
    if (back) {
      setRegister(null);
    } else {
      localStorage['token'] = props.user.token;
      console.log(props.user.token)
      axios.get('api/v1/users/me/').then(resposne => {
        console.log(resposne)
      }).catch(error => {
        console.log(error)
      })
      props.setOpenLoginDialog(false);
    }
  };

  const createAccount = () => {
    setRegister('partial');
  }

  return (
    <Dialog className="dialog" onClose={() => handleClose()} open={props.isOpenLoginDialog}>
      <DialogTitle className="dialog__title">{isRegister ? 'Sign up' : 'Login'}</DialogTitle>
      <DialogContent>
        {isRegister ? <RegisterForm handleClose={handleClose} registerType={isRegister}></RegisterForm> : <LoginForm handleClose={handleClose} createAccount={createAccount}></LoginForm>}
      </DialogContent>
      {!isRegister && <button className="form__signup" onClick={(e) => setRegister('full')}>Sign up</button>}
    </Dialog>
  );
};

const mapStateToProps = (state: State) => {
  return {
    isOpenLoginDialog: state.isOpenLoginDialog,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open)),
    setToken: (token: string) => dispatch(setToken(token))
  };
};

export const LoginDialog = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
