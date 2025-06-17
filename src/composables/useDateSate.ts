import { type DateType } from '@/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export function useDateState() {
  const dateKeys: (keyof DateType)[] = ['year', 'month', 'day'];

  const determineDaysInMonth = (month: string, format: string): string[] => {
    const formatMonths: string[] = [];
    format.split('').forEach((char) => {
      if (char === 'M') {
        formatMonths.push('M');
      }
    });
    const monthYear = `${month} 2024`; // Using a fixed leap year
    const formatMonthsYear = `${formatMonths.join('')} YYYY`;
    const parsed = dayjs(monthYear, formatMonthsYear, true);

    const length = parsed.isValid() ? parsed.daysInMonth() : 31;
    return Array.from({ length }, (_, i) =>
      (i + 1).toString().padStart(2, '0'),
    );
    // Ensure month is valid and return the number of days in that month
    // Default to 31 if month is invalid
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

  const determineMonths = (format: string): string[] => {
    if (format.includes('MMMM')) {
      return monthsLong;
    } else if (format.includes('MMM')) {
      return monthsLong.map((month) => month.slice(0, 3));
    } else {
      return Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0'),
      );
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

  const makeDateString = (date: DateType, shortFormat: boolean): string => {
    if (shortFormat) {
      return `${date.year}-${date.month}-${date.day}`;
    } else {
      return `${date.month.slice(0, 3)} ${date.day}, ${date.year}`;
    }
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
  const validateDate = (dateStr: string, shortFormat: boolean): boolean => {
    const format = shortFormat ? 'YYYY-MM-DD' : 'MMM DD, YYYY';
    return dayjs(dateStr, format, true).isValid();
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
    const shortFormat = !format.includes('MMM');
    const dateStr = makeDateString(date, shortFormat);
    if (validateDate(dateStr, shortFormat)) {
      return dayjs(dateStr).format(format);
    } else {
      return 'Invalid Date';
    }
  };

  const getDateParts = (dateStr: string, format: string): DateType | null => {
    const parsed = dayjs(dateStr, format, true);
    const shortFormat = !format.includes('MMM');
    if (!validateDate(dateStr, shortFormat)) {
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
