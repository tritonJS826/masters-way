/**
 * Handle change in input
 * @param {React.ChangeEvent<HTMLInputElement>} event
 * @param {string} callback takes as argument event.target.value
 */
export const handleChange = (event: React.ChangeEvent<HTMLInputElement>, callback: (arg: string) => void) => {
  callback(event.target.value);
};