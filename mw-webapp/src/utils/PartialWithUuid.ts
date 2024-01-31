/**
 * Partial type
 * @required {@link uuid} field
 */
export type PartialWithUuid<T> = Partial<T> & {

  /**
   * Uuid
   */
  uuid: string;
}

/**
 * Partial type
 * @required {@link id} field
 */
export type PartialWithId<T> = Partial<T> & {

  /**
   * Uuid
   */
  id: string;
}
