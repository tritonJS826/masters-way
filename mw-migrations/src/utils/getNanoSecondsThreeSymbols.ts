/**
 * Return first 3 symbols from  {@link nanoseconds}
 * @param nanoseconds 
 * @returns 
 */
export const getNanosecondsThreeSymbols = (nanoseconds: number) => {
  const nanosecondsStringified = nanoseconds.toString();
  let nanosecondsThreeSymbols;
  switch (nanosecondsStringified.length) {
    case 1: {
      nanosecondsThreeSymbols = `${nanosecondsStringified}00`;
      break;
    }
    case 2: {
      nanosecondsThreeSymbols = `${nanosecondsStringified}0`;
      break;
    }
    default: {
      nanosecondsThreeSymbols = nanosecondsStringified.substring(0, 3);
      }
  }

  return nanosecondsThreeSymbols;
}