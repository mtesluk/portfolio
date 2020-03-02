import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './LoginDialog.scss';

import { setOpenLoginDialog } from '../../actions/login-dialog';
import { setToken } from '../../actions/token';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  setToken: (token: string) => void;
  isOpenLoginDialog: boolean;
}

interface State {
  isOpenLoginDialog: boolean;
}

const LoginComponent = (props: Props) => {
  const [isRegister, setRegister] = useState<null | 'partial' | 'full'>(null);

  const handleClose = () => {
    props.setOpenLoginDialog(false);
  };

  const createAccount = () => {
    setRegister('partial');
  }

  return (
    <Dialog className="dialog" onClose={handleClose} open={props.isOpenLoginDialog}>
      <DialogTitle className="dialog__title">{isRegister ? 'Sign up' : 'Login'}</DialogTitle>
      <DialogContent>
        {isRegister ? <RegisterForm registerType={isRegister}></RegisterForm> : <LoginForm handleClose={handleClose} createAccount={createAccount}></LoginForm>}
      </DialogContent>
      <span className="form__signup">Sign up</span>
    </Dialog>
  );
};

const mapStateToProps = (state: State) => {
  return {
    isOpenLoginDialog: state.isOpenLoginDialog
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open)),
    setToken: (token: string) => dispatch(setToken(token))
  };
};

export const LoginDialog = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
