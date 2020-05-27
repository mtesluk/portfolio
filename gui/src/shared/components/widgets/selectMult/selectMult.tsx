import React, { useState } from 'react';

import './selectMult.scss';

import { Entity } from 'shared/interfaces/select';
import SelectWidget from '../select/select';


interface Props {
  onChange?: (value: string[]) => void;
  data?: Entity[];
  endpoint?: string;
  placeholder?: string;
}

const SelectMultipleWidget = (props: Props) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (value: string) => {
    const newSelected = [value, ...selected];
    setSelected(newSelected);
    if (props.onChange) props.onChange(newSelected);
  }

  const rm = (id) => {
    setSelected(selected.filter((el, i) => i != id));
  }

  const renderElements = () => {
    return <div className="widget-select-multiple__selected-elements">
            {selected.map((s, index) => {
              return <span key={index} className="widget-select-multiple__selected-element">
                {s}
                <span onClick={() => rm(index)} className="widget-select-multiple__selected-element-rm">x</span>
              </span>
            })}
          </div>
  }

  return (
    <div className="widget-select-multiple">
      <SelectWidget
        placeholder={props.placeholder}
        data={props.data}
        endpoint={props.endpoint}
        onChange={(value: string | number) => handleChange(value as string)}
      />
      {renderElements()}
    </div>
  )
}

export default SelectMultipleWidget;