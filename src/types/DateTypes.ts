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

export { type Day, type Month };
