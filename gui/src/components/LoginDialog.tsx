import React from 'react';
import './LoginDialog.scss';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Facebook from '../containers/Facebook';

export const LoginDialog = (props) => {
  // const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog className="dialog" onClose={handleClose} open={open}>
      <DialogTitle className="dialog__title">Login</DialogTitle>
      <Facebook />
      <input className="dialog__username" placeholder="Username"></input>
      <input className="dialog__password" placeholder="Password"></input>
      <span className="dialog__signup">Sign up</span>
    </Dialog>
  );
};
