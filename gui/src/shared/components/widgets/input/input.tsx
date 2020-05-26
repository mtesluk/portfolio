import React from 'react';

import './input.scss';


interface Props {
  onChange?: (val: string) => void;
  refe?: any;
  name?: string;
  placeholder?: string;
  type?: string;
}

const InputWidget = (props: Props) => {
  const onChange = (event: any) => {
    if (props.onChange) props.onChange(event.target.value);
  }

  return (
    <input
      className="widget-input"
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      ref={props.refe}
      onChange={e => onChange(e)}
    />
  )
}

export default InputWidget;