/**
 * Return first 3 symbols from  {@link nanoseconds}
 * @param nanoseconds 
 * @returns 
 */
export const getNanosecondsThreeSymbols = (nanoseconds: number) => {
  const nanosecondsStringified = nanoseconds.toString();
  let nanosecondsThreeSymbols;
  if (nanosecondsStringified.length < 3) {
    nanosecondsThreeSymbols = nanosecondsStringified.padEnd(3, "0");
  } else {
    nanosecondsThreeSymbols = nanosecondsStringified.substring(0, 3);
  }

  return nanosecondsThreeSymbols;
}