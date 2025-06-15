import dayjs from 'dayjs';
import { type DateType } from '@/types';

export function useDateState() {
  const dateKeys: (keyof DateType)[] = ['year', 'month', 'day'];

  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
  const determineMonths = (format: string): string[] => {
    if (
      format.includes('MM') &&
      (!format.includes('MMMM') || format.includes('MMM'))
    ) {
      return Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0'),
      );
    } else if (format.includes('MMMM')) {
      return [
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
    } else {
      return [
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
    }
  };
  const makeYearsArray = (
    firstYear: number,
    yearsAvailable: number,
  ): string[] => {
    return Array.from({ length: yearsAvailable }, (_, i) =>
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
   * @param {string} format - The format against which to validate the date string.
   * @returns {boolean} - Returns true if the date string is valid according to the format, otherwise false.
   */
  const validateDate = (dateStr: string, format: string): boolean => {
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
    const dateStr = `${date.year}-${date.month}-${date.day}`;
    if (validateDate(dateStr, format)) {
      return dayjs(dateStr).format(format);
    } else {
      return '';
    }
  };

  return {
    determineMonths,
    days,
    makeYearsArray,
    makeDateString,
    isFullDate,
    validateFormat,
    validateDate,
    formatDate,
  };
}
