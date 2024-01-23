const ALL_AVAILABLE_COLORS = 16777215;
const HEXADECIMAL_BASE = 16;

/**
 * Random color
 */
export const getRandomColor = () => {
  const colorNumber = Math.floor(Math.random() * ALL_AVAILABLE_COLORS).toString(HEXADECIMAL_BASE);
  const color = `#${colorNumber}`;

  return color;
};

