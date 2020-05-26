import React from 'react';

import './button.scss';


interface Props {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: any) => void;
}

const ButtonWidget = (props: Props) => {
  return (
    <button
      className="widget-button"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default ButtonWidget;