/**
 * Split array on subArrays
 */
export const getChunksArray = <T>(array: T[], chunkLength: number): T[][] => {
  const chunksArray: T[][] = [];

  for (let i = 0; i < array.length; i += chunkLength) {
    const chunkArray = array.slice(i, i + chunkLength);
    chunksArray.push(chunkArray);
  }

  return chunksArray;
};
