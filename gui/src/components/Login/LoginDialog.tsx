import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import './LoginDialog.scss';

import { Facebook } from './Facebook';
import { setOpenLoginDialog } from '../../actions/login-dialog';
import { setToken } from '../../actions/token';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  setToken: (token: string) => void;
  isOpenLoginDialog: boolean;
}

interface State {
  isOpenLoginDialog: boolean;
}

const LoginComponent = (props: Props) => {
  const [register, setRegister] = useState(false);

  const handleClose = () => {
    props.setOpenLoginDialog(false);
  };

  const createAccount = () => {
    setRegister(true);
    axios.post('api/v1/users/', {}).then(response => {
      console.log(response)
      setRegister(false);
    }).catch(err => {
      console.log(err.response.status)
    })
  }

  const authUser = () => {
    axios.post('api/v1/api-token-auth').then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err.response.status === 403)
    })
  }

  const setAuth = (token: string) => {
    props.setToken(token);
  }

  const handleAuthFacebook = (fb_id: string, token: string) => {
    console.log(22222222222)
    axios.get(`api/v1/users/exist_fb_token/?fb_id=${fb_id}`).then(response => {
      const exists = response.data.exists;
      exists ? setAuth(token) : createAccount();
      console.log(exists)
    }).catch(err => {
      console.log(11111)
    })
  };

  const getLoginForm = () => {
    return (
      <div className="dialog__login">
        <DialogTitle className="dialog__title">Login</DialogTitle>
        <Facebook onAuthenticated={handleAuthFacebook} />
        <input className="dialog__username" placeholder="Username"></input>
        <input className="dialog__password" placeholder="Password"></input>
        <span className="dialog__signup">Sign up</span>
      </div>
    )
  }

  const getRegisterForm = () => {
    return (
      <div className="dialog__register">
        <DialogTitle className="dialog__title">Register</DialogTitle>
      </div>
    )
  }

  return (
    <Dialog className="dialog" onClose={handleClose} open={props.isOpenLoginDialog}>
      {register ? getRegisterForm() : getLoginForm()}
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
