/**
 * Return first 3 symbols from  {@link value}
 */
export const truncateToThreeChars = (value: number | string) => {
  const threeSymbols = value.toString()
    .padEnd(3, "0")
    .substring(0, 3);

  return threeSymbols;
}