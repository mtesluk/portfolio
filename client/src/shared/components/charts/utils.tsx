import { RangeConfig } from './interfaces';

export function manageColors(amount: number, colors: RangeConfig | string): string {
  if (!(colors instanceof Object)) {
    return colors;
  }
  for(let range of colors.ranges) {
    if (amount > range.min && amount < range.max) return range.color;
  }
  return colors.default;
};
