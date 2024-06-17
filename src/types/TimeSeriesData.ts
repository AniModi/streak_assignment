export interface TimeSeriesData {
  [key: string]: {
    price: number;
    change: number;
    change_percent: number;
    volume: number;
  };
}
