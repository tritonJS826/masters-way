/**
 * Handle actions on double click
 * @param {function} callback takes as argument boolean value
 */
export const setTrueValue = (callback: (arg: boolean) => void) => {
  callback(true);
};