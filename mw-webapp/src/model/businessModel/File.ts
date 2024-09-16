import {makeAutoObservable} from "mobx";

/**
 * File model
 */
export class FileModel {

  /**
   * File's UUID
   */
  public uuid: string;

  /**
   * File's name
   */
  public name: string;

  /**
   * File's owner UUID
   */
  public ownerId: string;

  /**
   * File's url
   */
  public url: string;

  constructor(fileData: FileModel) {
    makeAutoObservable(this);
    this.uuid = fileData.uuid;
    this.name = fileData.name;
    this.ownerId = fileData.ownerId;
    this.url = fileData.url;
  }

}
