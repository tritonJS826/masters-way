/**
 * Safe hash map
 * Use it when you don't want to handle case with undefined in the .get method
 * But use a safe hashmap only if you are sure that the element you need to search is exist in the map
 */
export class SafeMap<K, T> {

  public items: Map<K, T>;

  constructor(customHashMapData: Map<K, T>) {
    this.items = customHashMapData;
  }

  /**
   * Check is value with given key is exist in hashmap
   */
  public hasValue(key: K) {
    return this.items.has(key);
  }

  /**
   * Set value to hashMap
   */
  public setValue(key: K, value: T) {
    this.items.set(key, value);

    return this;
  }

  /**
   * Get value from hashMap
   */
  public getValue(key: K): T {
    const value = this.items.get(key);

    if (!value) {
      throw Error(`Value with key ${key} is undefined`);
    }

    return value;
  }

}
