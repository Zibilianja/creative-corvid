type Day = {
  [key: number]: {
    name: string;
    short: string;
    value: number;
  };
};
type Month = {
  [key: number]: {
    name: string;
    short: string;
    days: number;
    value: number;
  };
};
type DateType = {
  day: string;
  month: string;
  year: string;
};

export type { Day, Month, DateType };
