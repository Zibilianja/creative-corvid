import { type DateType } from '@/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export function useDateState() {
  const dateKeys: (keyof DateType)[] = ['year', 'month', 'day'];
  const daysOfEachMonth: Record<string, number> = {
    '01': 31, // January
    '02': 28, // February (not accounting for leap years here)
    '03': 31, // March
    '04': 30, // April
    '05': 31, // May
    '06': 30, // June
    '07': 31, // July
    '08': 31, // August
    '09': 30, // September
    '10': 31, // October
    '11': 30, // November
    '12': 31, // December
  };
  const determineDaysInMonth = (month: string, format: string): number => {
    const monthFormatLong: boolean =
      format.includes('MMMM') || format.includes('MMM');
    if (monthFormatLong) {
      return findMatchingDays(monthsShort.indexOf(month.slice(0, 3)));
    }

    if (format.includes('MM')) {
      return daysOfEachMonth[month.padStart(2, '0')].toString();
    }
    return '31'; // Default to 31 days if format is not recognized
  };
  const findMatchingDays = (monthIndex: number): string => {
    return daysOfEachMonth[
      (monthIndex + 1).toString().padStart(2, '0')
    ].toString();
  };

  const monthsLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const determineMonths = (format: string): string[] => {
    if (
      format.includes('MM') &&
      (!format.includes('MMMM') || format.includes('MMM'))
    ) {
      return Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0'),
      );
    } else if (format.includes('MMMM')) {
      return monthsLong;
    } else {
      return monthsShort;
    }
  };
  const makeYearsArray = (
    firstYear: number,
    yearsAvailable: number,
  ): string[] => {
    return Array.from({ length: yearsAvailable + 1 }, (_, i) =>
      (firstYear + i).toString(),
    );
  };

  const makeDateString = (date: DateType): string => {
    return `${date.year}-${date.month}-${date.day}`;
  };

  const isFullDate = (date: DateType): boolean => {
    return dateKeys.every((key) => !!date[key].trim());
  };

  /**
   *  @description - Validates a date format string to ensure it is a valid format.
   *
   * @param {string} format - The date format string to validate.
   * @returns {boolean} - Returns true if the format is valid, otherwise false.
   */
  const validateFormat = (format: string): boolean => {
    try {
      const testOutput = dayjs('2023-10-01').format(format); // Example date string for validation
      const parsedDate = dayjs(testOutput, format, true);
      return parsedDate.isValid();
    } catch {
      return false;
    }
  };

  /**
   * @description - Validates a date string against a specified format.
   *
   * @param {string} dateStr - The date string to validate.
   * @returns {boolean} - Returns true if the date string is valid according to the format, otherwise false.
   */
  const validateDate = (dateStr: string): boolean => {
    return dayjs(dateStr, 'YYYY-MM-DD', true).isValid();
  };

  /**
   * @description - Formats a date object into a string according to a specified format.
   *
   * @param {DateType} date - The date object containing year, month, and day.
   * @param {string} format - The format string to use for formatting the date.
   * @returns {string} - Returns the formatted date string if valid, otherwise an error message.
   * @throws {Error} - Throws an error if the date is invalid or the format is incorrect.
   * */
  const formatDate = (date: DateType, format: string): string => {
    const dateStr = makeDateString(date);
    if (validateDate(dateStr)) {
      return dayjs(dateStr).format(format);
    } else {
      return 'Invalid Date';
    }
  };

  const getDateParts = (dateStr: string, format: string): DateType | null => {
    const parsed = dayjs(dateStr, format, true);
    if (!validateDate(dateStr)) {
      return null;
    }
    return {
      year: parsed.format('YYYY'),
      month: parsed.format('MM'),
      day: parsed.format('DD'),
    };
  };

  return {
    determineDaysInMonth,
    determineMonths,
    makeYearsArray,
    makeDateString,
    isFullDate,
    validateFormat,
    validateDate,
    formatDate,
    getDateParts,
  };
}
