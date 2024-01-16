/**
 * ArrayToHashMapArgs
 */
interface ArrayToHashMapArgs<Entity extends object, Key extends keyof Entity> {

  /**
   * Field of {@link Entity} that will be used as key for hashmap
   */
  keyField: Key;

  /**
   * Array's values that will be converted to hashmap
   */
  list: Entity[];
}

/**
 * Create hashmap from array
 */
export const arrayToHashMap = <
  Entity extends object,
  Key extends keyof Entity
>(args: ArrayToHashMapArgs<Entity, Key>): Map<Entity[Key], Entity> => {

  const mappedList = args.list.map((item: Entity): [Entity[Key], Entity] => [item[args.keyField], item]);
  const hashMap = new Map(mappedList);

  return hashMap;
};
