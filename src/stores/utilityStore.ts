import { defineStore } from 'pinia';
import { type UtilityStore } from '@/types';

export const useUtilityStore = defineStore('storeName', (): UtilityStore => {
  /**
   *  @description - Validates a text input to ensure it is not empty.
   *
   * @param {string} value - The text input value to validate.
   * @returns {boolean} - Returns true if the input is valid (not empty), otherwise false.
   */
  const validateTextInput = (value: string): boolean => {
    return value.trim().length > 0;
  };

  return {
    validateTextInput,
  };
});
