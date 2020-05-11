import React from 'react';
interface State {
}
interface Props {
    onChange?: (val: string) => void;
    refe?: any;
    name?: string;
    placeholder?: string;
    type?: string;
}
declare class InputWidget extends React.Component<Props, State> {
    onChange(event: any): void;
    render(): JSX.Element;
}
export default InputWidget;
