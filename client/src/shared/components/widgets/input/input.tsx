import React, { useEffect, useState } from 'react';

import './input.scss';


interface Props {
  id?: string;
  onChange?: (val: string) => void;
  refe?: any;
  name?: string;
  placeholder?: string;
  type?: string;
  initialValue?: string;
}

const InputWidget = (props: Props) => {
  const [state, setstate] = useState('');

  const onChange = (value: string) => {
    if (props.onChange) props.onChange(value);
    setstate(value);
  }

  useEffect(() => {
    if (props.initialValue && props.onChange) {
      setstate(props.initialValue);
      props.onChange(props.initialValue);
    }
  }, [props.initialValue])


  return (
    <input
      id={props.id}
      className="widget-input"
      type={props.type || 'text'}
      placeholder={props.placeholder}
      name={props.name || 'input'}
      ref={props.refe}
      onChange={e => onChange(e.target.value)}
      value={state}
    />
  )
}

export default InputWidget;