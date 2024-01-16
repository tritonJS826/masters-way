/**
 * ArrayToHashMapArgs
 */
interface ArrayToHashMapArgs<Entity extends object> {

  /**keyField
   */
  keyField: keyof Entity;

  /**
   * list
   */
  list: Entity[];

}

/**
 * Create hashmap from array
 * {@link key} is one of {@link item} properties with string type
 */
export const arrayToHashMap =
  <Entity extends object>(args: ArrayToHashMapArgs<Entity>): Map<string, Entity> => {
    const mappedList = args.list.map((item: Entity): [string, Entity] => [String(item[args.keyField]), item]);
    const hashMap = new Map(mappedList);

    return hashMap;
  };
