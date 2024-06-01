import {makeAutoObservable} from "mobx";

/**
 * Way tag data
 */
export class WayTag {

  /**
   * Way tag uuid
   */
  public uuid: string;

  /**
   * Way tag name
   */
  public name: string;

  constructor(wayTag: WayTag) {
    makeAutoObservable(this);
    this.name = wayTag.name;
    this.uuid = wayTag.uuid;
  }

}
