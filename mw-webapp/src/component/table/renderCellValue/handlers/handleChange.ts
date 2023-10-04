/**
 * Handle change in input
 * @param {string} value
 * @param  {function} callback takes as argument event.target.value
 */
export const handleChange = (value: string, callback: (arg: string) => void) => {
  callback(value);
};