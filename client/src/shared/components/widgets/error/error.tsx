import React from 'react';

import './error.scss'


interface Props {
  customStyle?: {};
  text: string;
}

const ErrorWidget = (props: Props) => {
  return (
    <div
      className="widget-error"
      style={{...props.customStyle}}
    >
      {props.text}
    </div>
  )
}

export default ErrorWidget;