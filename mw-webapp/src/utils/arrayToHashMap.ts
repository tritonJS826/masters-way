/**
 * ArrayToHashMapArgs
 */
interface ArrayToHashMapArgs<Entity> {

  /**
   * Field of {@link Entity} that will be used as key for hashmap
   */
  keyField: keyof Entity;

  /**
   * Array's values that will be converted to hashmap
   */
  list: Entity[];

}

/**
 * Create hashmap from array
 */
export const arrayToHashMap = <Entity>(args: ArrayToHashMapArgs<Entity>): Map<string, Entity> => {
  const mappedList = args.list.map((item: Entity): [string, Entity] => [String(item[args.keyField]), item]);
  const hashMap = new Map(mappedList);

  return hashMap;
};
