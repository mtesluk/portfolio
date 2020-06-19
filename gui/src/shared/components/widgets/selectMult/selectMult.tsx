import React, { useState, useEffect } from 'react';

import './selectMult.scss';

import { SelectedEntity } from 'shared/interfaces/select';
import SelectWidget from '../select/select';


interface Props {
  onChange?: (value: (number | string)[]) => void;
  data?: SelectedEntity[];
  endpoint?: string;
  placeholder?: string;
  initialValue?: string[] | number[];
}

const SelectMultipleWidget = (props: Props) => {
  const [selected, setSelected] = useState<(number | string)[]>([])

  useEffect(() => {
    if (props.onChange) props.onChange(selected);
  }, [selected]);

  useEffect(() => {
    if (props.initialValue && props.initialValue.length !== selected.length) setSelected(props.initialValue);
  }, [props.initialValue]);


  function handleAdd(value: number | string) {
    const newSelected = [value, ...selected];
    setSelected(newSelected);
  }

  const rm = (index: number) => {
    setSelected(selected.filter((el, i) => index != i));
  }

  const renderElements = () => {
    return <div className="widget-select-multiple__selected-elements">
            {selected.map((element: number | string, index: number) => {
              return <span key={index} className="widget-select-multiple__selected-element">
                {element}
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
        onChange={(value: number | string) => handleAdd(value)}
      />
      {renderElements()}
    </div>
  )
}

export default SelectMultipleWidget;