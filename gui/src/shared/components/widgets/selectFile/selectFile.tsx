import React, { CSSProperties, useState } from 'react';

import './selectFile.scss';
import BackupIcon from '@material-ui/icons/Backup';


interface Props {
  onChange?: (file: File) => void;
  name?: string;
  orderNumber?: number;
}

const SelectFileWidget = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file)
    props.onChange && props.onChange(file);
  };

  const renderImage = selectedFile ? <img className="widget-select-file__img" src={URL.createObjectURL(selectedFile)} /> : <></ >;
  const classResize = selectedFile ? 'widget-select-file--resize' : '';
  const uploadIcon = <BackupIcon fontSize="large" style={{verticalAlign: 'text-top', marginRight: '1rem'}}/>;

  return (
    <div className={`widget-select-file ${classResize}`}>
      {renderImage}
      <label
        htmlFor={`widget-select-file-id-${props.orderNumber}`}
        className="widget-select-file__label"
      >
        {uploadIcon}
        {selectedFile?.name || 'Select file...'}
      </label>
      <input
        id={`widget-select-file-id-${props.orderNumber}`}
        className="widget-select-file__input"
        type="file"
        name={props.name}
        accept="image/*"
        onChange={(e) => onFileChange(e)}
        />
    </div>
  )
}

export default SelectFileWidget;