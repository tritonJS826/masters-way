/**
 * Uuid props
 */
interface UuidProps {

  /**
   * Uuid of {@link T}
   */
  uuid: string;
}

/**
 * Create hashmap from array
 * @key @T.uuid
 * @value @T
 */
export const createHashMap = <T extends UuidProps>(array: T[]): Map<string, T> => {
  const hashMap = new Map(array.map((item: T): [string, T] => [item.uuid, item]));

  return hashMap;
};
