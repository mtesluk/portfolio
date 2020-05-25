import React from 'react';


const InlineStyles = {
  button: {
    fontSize: '2rem',
    border: '0',
    // borderBottom: '1px black solid',
    backgroundColor: 'transparent',
    // borderRadiusTop: '5px',
    // outline: 'none',
    // fontFamily: 'serif',
    // paddingLeft: '3px',
  }
};

interface State {

}

interface Props {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: any) => void;
}

class ButtonWidget extends React.Component<Props, State> {
  render() {
    return (
      <button
        style={InlineStyles.button}
        type={this.props.type}
        onClick={this.props.onClick}
      >{this.props.text}</button>
    )
  }
}

export default ButtonWidget;