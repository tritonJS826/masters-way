/**
 * Split array on subArrays
 */
export const getChunksArray = <T>(array: T[], chunkLength: number): T[][] => {
  const chunksArray = [];

  for (let i = 0; i < array.length; i += chunkLength) {
    chunksArray.push(array.slice(i, i + chunkLength));
  }

  return chunksArray;
};