import React from 'react';
import { CloseOutlined } from '@material-ui/icons';

import './Dialog.scss';


interface Props {
    onClose: () => void;
    open: boolean;
    children?: any;
    title?: string;
}

export const Dialog = (props: Props) => {

  const onBackgroundClick = (event) => {
    if(event.target === event.currentTarget) {
        props.onClose();
    }
  }

  return (
    <div className={`dialog ${props.open ? 'dialog--show' : ''}`} onClick={(e) => onBackgroundClick(e)}>
      <div className="dialog__box">
        <CloseOutlined className="dialog__exit-icon" fontSize="large" onClick={props.onClose} />
        <h3 className="dialog__title">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
};