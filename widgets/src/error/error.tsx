import React from 'react';


const InlineStyles = {
  error: {
    color: 'red',
    font_weight: 'bold' as string,
    fontSize: '1.5rem',
  }
};

interface Props {
  customStyle?: {};
  text: string;
}

const ErrorWidget = (props: Props) => {
  return (
      <div
        className="widget-error"
        style={{...InlineStyles.error, ...props.customStyle}}
      >
        {props.text}
      </div>
  )
}

export default ErrorWidget;