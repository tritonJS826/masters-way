/**
 * Colors which are contrast on both white and black background
 */
const availableColors = [
  "#FFD700",
  "#00FA9A",
  "#FF6347",
  "#4169E1",
  "#FF69B4",
  "#8B4513",
  "#32CD32",
  "#8A2BE2",
  "#FFA07A",
  "#40E0D0",
  "#8B008B",
  "#FF4500",
  "#7FFF00",
  "#9932CC",
  "#20B2AA",
  "#008080",
  "#FF8C00",
  "#00BFFF",
  "#FF4500",
  "#8B008B",
  "#008080",
  "#FFD700",
  "#8A2BE2",
  "#32CD32",
  "#FF6347",
  "#FF4500",
  "#00FA9A",
  "#FF6347",
  "#4169E1",
  "#FF69B4",
  "#8B4513",
  "#32CD32",
  "#8A2BE2",
  "#FFA07A",
  "#40E0D0",
  "#8B008B",
  "#FF4500",
  "#7FFF00",
  "#9932CC",
  "#20B2AA",
  "#008080",
  "#FF8C00",
  "#00BFFF",
  "#FF4500",
  "#8B008B",
  "#008080",
  "#FFD700",
  "#8A2BE2",
  "#32CD32",
  "#FF6347",
];

/**
 * Get random color from available colors based on string
 */
export const getColorByString = (string: string): string => {
  let hash = 0;
  if (string.length === 0) {
    return availableColors[hash];
  }
  for (let i = 0; i < string.length; i++) {
    const SOME_LOCAL_ADJUSTMENT = 5;
    hash = string.charCodeAt(i) + ((hash << SOME_LOCAL_ADJUSTMENT) - hash);
    hash = hash & hash;
  }
  hash = ((hash % availableColors.length) + availableColors.length) % availableColors.length;

  return availableColors[hash];
};
