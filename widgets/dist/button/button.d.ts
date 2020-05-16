import React from 'react';
interface State {
}
interface Props {
    text?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (event: any) => void;
}
declare class ButtonWidget extends React.Component<Props, State> {
    render(): JSX.Element;
}
export default ButtonWidget;
