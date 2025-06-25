/**
 * Convert asterisk patterns to ordered list items
 */
export const convertAsterisksToOrderedList = (text: string): string => {
  let counter = 0;

  return text.replace(
    /^(\*)\s*(.*)$/gm,
    (_match: string, _star: string, content: string) => {
      counter++;

      return `${counter}. ${content}`;
    },
  );
};
