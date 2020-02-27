import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import './LoginDialog.scss';

import { Facebook } from './Facebook';
import { setOpenLoginDialog } from '../../actions/login-dialog';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  isOpenLoginDialog: boolean;
}

interface State {
  isOpenLoginDialog: boolean;
}

const LoginComponent = (props: Props) => {
  const handleClose = () => {
    props.setOpenLoginDialog(false);
  };

  const createAccount = () => {
    axios.post('api/v1/users/').then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err.response.status === 403)
    })
  }

  const authUser = () => {
    axios.post('api/v1/api-token-auth').then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err.response.status === 403)
    })
  }

  const setAuth = () => {
    
  }

  const handleAuthFacebook = (fb_id: string) => {
    console.log(22222222222)
    axios.get(`api/v1/users/exist_fb/?fb_id=${fb_id}`).then(response => {
      const exists = response.data.exists;
      exists ? setAuth() : createAccount();
    }).catch(err => {
      console.log(11111)
      // const not_exist = err.response.status === 403;
      // not_exist ? createAccount() : authUser();
    })
  };

  return (
    <Dialog className="dialog" onClose={handleClose} open={props.isOpenLoginDialog}>
      <DialogTitle className="dialog__title">Login</DialogTitle>
      <Facebook onAuthenticated={handleAuthFacebook} />
      <input className="dialog__username" placeholder="Username"></input>
      <input className="dialog__password" placeholder="Password"></input>
      <span className="dialog__signup">Sign up</span>
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
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open))
  };
};

export const LoginDialog = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
