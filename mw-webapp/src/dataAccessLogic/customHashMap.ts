/**
 * Uuid props
 */
interface UuidProps {

  /**
   * Uuid of row in the table
   */
  uuid: string;
}

/**
 * Hash map
 * Use a custom hashmap only if you are sure that the element you need to search is exist in the map
 */
export class CustomHashMap<T extends UuidProps> {

  public items: Map<string, T>;

  constructor(customHashMapData: T[]) {
    this.items = new Map(customHashMapData.map((item: T): [string, T] => [item.uuid, item]));
  }

  /**
   * Set value to hashMap
   */
  public setValue(item: T) {
    this.items.set(item.uuid, item);
  }

  /**
   * Get value from hashMap
   */
  public getValue(itemUuid: string): T {
    const value = this.items.get(itemUuid);

    if (!value) {
      throw Error(`Value with key ${itemUuid} is undefined`);
    }

    return value;
  }

}
