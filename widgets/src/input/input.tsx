import React from 'react';


const InlineStyles = {
  input: {
    width: '100%',
    fontSize: '2.5rem',
  }
}

interface State {

}

interface Props {
  onChange?: (val: string) => void;
  refe?: any;
  name?: string;
  placeholder?: string;
  type?: string;
}

class InputWidget extends React.Component<Props, State> {
  onChange(event: any) {
    if (this.props.onChange) this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        className="widget-input"
        style={InlineStyles.input}
        type={this.props.type}
        placeholder={this.props.placeholder}
        name={this.props.name}
        ref={this.props.refe}
        onChange={e => this.onChange(e)}
      />
    )
  }
}

export default InputWidget;