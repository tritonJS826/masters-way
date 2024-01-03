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
 * !! Works only for arrays with entities with 'uuid' field !!
 * TODO: add ability to choose 'key' field
 */
export const arrayToHashMap = <T extends UuidProps>(array: T[]): Map<string, T> => {
  const hashMap = new Map(array.map((item: T): [string, T] => [item.uuid, item]));

  return hashMap;
};
