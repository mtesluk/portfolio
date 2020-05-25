import React, { CSSProperties, useState } from 'react';


const InlineStyles: {[name: string]: CSSProperties} = {
  file: {
    display: 'none',
    position: 'absolute',
    zIndex: -1,
    margin: 'auto',
  },
  label: {
    cursor: 'pointer',
    border: '1px dashed black',
    padding: '1rem 2rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  widget: {
    width: '100%',
    boxShadow: '2px 0px 5px 0px rgba(0,0,0,0.75)',
    position: 'relative',
    padding: '5rem',
    backgroundColor: '#ffa31a',
  }
};

interface Props {
  onChange?: (file: File) => void;
  name?: string;
  orderNumber?: number;
}

interface State {

}

const SelectFileWidget = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file.name)
    props.onChange && props.onChange(file);
  };

  return (
    <div className="widget-select-file" style={InlineStyles.widget}>
      <label style={InlineStyles.label} htmlFor={`widget-select-file-id-${props.orderNumber}`}>
        {/* <img src="upload.svg" alt="upload-svg" /> */}
        {selectedFile || 'Select file...'}</label>
      <input style={InlineStyles.file} type="file" name={props.name} accept="image/*" onChange={(e) => onFileChange(e)} id={`widget-select-file-id-${props.orderNumber}`} />
    </div>
  )
}

export default SelectFileWidget;