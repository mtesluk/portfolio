export interface DataBasic {
    name: string;
    value: number;
}

export interface PropsBasic {
    width: number;
    data: DataBasic[];
    classSvgName: string;
    setPickedData: (name: string) => void;
}

export interface RangeColor {
    min: number;
    max: number;
    color: string;
}

export interface RangeConfig {
    ranges: RangeColor[];
    default: string;
 }