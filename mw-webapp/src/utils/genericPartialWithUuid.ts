export type GenericPartialWithUuid<T> = Partial<T> & {

  /**
   * Uuid
   */
  uuid: string;
}
