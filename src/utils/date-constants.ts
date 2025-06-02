import { type Day, type Month } from '../types/DateTypes';

const days: Day = {
  0: {
    name: 'Sunday',
    short: 'Sun',
    value: 0,
  },
  1: {
    name: 'Monday',
    short: 'Mon',
    value: 1,
  },
  2: {
    name: 'Tuesday',
    short: 'Tue',
    value: 2,
  },
  3: {
    name: 'Wednesday',
    short: 'Wed',
    value: 3,
  },
  4: {
    name: 'Thursday',
    short: 'Thu',
    value: 4,
  },
  5: {
    name: 'Friday',
    short: 'Fri',
    value: 5,
  },
  6: {
    name: 'Saturday',
    short: 'Sat',
    value: 6,
  },
};

const months: Month = {
  0: {
    name: 'January',
    short: 'Jan',
    days: 31,
    value: 0,
  },
  1: {
    name: 'February',
    short: 'Feb',
    days: 28,
    value: 1,
  },
  2: {
    name: 'March',
    short: 'Mar',
    days: 31,
    value: 2,
  },
  3: {
    name: 'April',
    short: 'Apr',
    days: 30,
    value: 3,
  },
  4: {
    name: 'May',
    short: 'May',
    days: 31,
    value: 4,
  },
  5: {
    name: 'June',
    short: 'Jun',
    days: 30,
    value: 5,
  },
  6: {
    name: 'July',
    short: 'Jul',
    days: 31,
    value: 6,
  },
  7: {
    name: 'August',
    short: 'Aug',
    days: 31,
    value: 7,
  },
  8: {
    name: 'September',
    short: 'Sep',
    days: 30,
    value: 8,
  },
  9: {
    name: 'October',
    short: 'Oct',
    days: 31,
    value: 9,
  },
  10: {
    name: 'November',
    short: 'Nov',
    days: 30,
    value: 10,
  },
  11: {
    name: 'December',
    short: 'Dec',
    days: 31,
    value: 11,
  },
};

export { days, months };
