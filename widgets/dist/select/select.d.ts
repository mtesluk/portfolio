import React from 'react';
interface State {
    selected: number;
    data: Entity[];
}
interface Entity {
    id: number;
    name: string;
}
interface Props {
    onChange?: (id: number) => void;
    data?: Entity[];
    endpoint?: string;
    placeholder?: string;
    changeValue?: boolean;
}
declare class SelectWidget extends React.Component<Props, State> {
    private _httpService;
    state: {
        selected: number;
        data: never[];
    };
    static getDerivedStateFromProps(props: Props, state: State): {
        data: Entity[] | undefined;
    } | null;
    componentDidMount(): void;
    getData(url: string | null): void;
    handleSelectChange(event: any): void;
    render(): JSX.Element;
}
export default SelectWidget;
