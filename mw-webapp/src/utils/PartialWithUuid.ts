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
